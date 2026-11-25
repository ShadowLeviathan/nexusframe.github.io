
import { withSupabase } from "npm:@supabase/server@1";

// Converte uma data do TMDB em um ano.
function getYear(date: string | undefined): number | null {
  if (!date || date.length < 4) return null;

  const year = Number(date.substring(0, 4));

  return Number.isInteger(year) ? year : null;
}

// Consulta um endpoint do TMDB.
async function tmdbGet(
  endpoint: string,
  params: Record<string, string>,
  token: string
) {
  const url = new URL(
    `https://api.themoviedb.org/3/${endpoint}`
  );

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Erro na API do TMDB: ${response.status}`);
  }

  return await response.json();
}

// A função principal.
export default {
  fetch: withSupabase(
    { auth: "publishable" },
    async (request) => {

      // Aceita somente requisições GET.
      if (request.method !== "GET") {
        return Response.json(
          { error: "Método não permitido." },
          { status: 405 }
        );
      }

      const url = new URL(request.url);

      const action = url.searchParams.get("action");
      const query = url.searchParams.get("q")?.trim() ?? "";

      // Validação dos parâmetros.
      if (action !== "search") {
        return Response.json(
          { error: "Ação inválida." },
          { status: 400 }
        );
      }

      if (query.length < 2 || query.length > 100) {
        return Response.json(
          { error: "Digite entre 2 e 100 caracteres." },
          { status: 400 }
        );
      }

      // Recupera o token protegido.
      const token = Deno.env.get("TMDB_READ_ACCESS_TOKEN");

      if (!token) {
        console.error("Token do TMDB não configurado.");

        return Response.json(
          { error: "Serviço de filmes não configurado." },
          { status: 500 }
        );
      }

      try {
        // Executa quatro consultas em paralelo.
        const [
          movieData,
          tvData,
          movieGenresData,
          tvGenresData,
        ] = await Promise.all([

          tmdbGet("search/movie", {
            query,
            language: "pt-BR",
            include_adult: "false",
            page: "1",
          }, token),

          tmdbGet("search/tv", {
            query,
            language: "pt-BR",
            page: "1",
          }, token),

          tmdbGet("genre/movie/list", {
            language: "pt-BR",
          }, token),

          tmdbGet("genre/tv/list", {
            language: "pt-BR",
          }, token),
        ]);

        // Cria mapas para converter IDs de gêneros em nomes.
        const movieGenres = new Map(
          movieGenresData.genres.map(
            (genre: { id: number; name: string }) =>
              [genre.id, genre.name]
          )
        );

        const tvGenres = new Map(
          tvGenresData.genres.map(
            (genre: { id: number; name: string }) =>
              [genre.id, genre.name]
          )
        );

        // Padroniza os filmes.
        const movies = movieData.results.map((item: any) => ({
          id: `movie-${item.id}`,
          tmdbId: item.id,
          type: "movie",
          title: item.title ?? item.original_title ?? "Sem título",
          posterPath: item.poster_path ?? null,
          year: getYear(item.release_date),
          rating: item.vote_average ?? null,
          genres: (item.genre_ids ?? [])
            .map((id: number) => movieGenres.get(id))
            .filter(Boolean),
          overview: item.overview ?? "",
          cast: [],
          popularity: item.popularity ?? 0,
        }));

        // Padroniza as séries.
        const series = tvData.results.map((item: any) => ({
          id: `tv-${item.id}`,
          tmdbId: item.id,
          type: "tv",
          title: item.name ?? item.original_name ?? "Sem título",
          posterPath: item.poster_path ?? null,
          year: getYear(item.first_air_date),
          rating: item.vote_average ?? null,
          genres: (item.genre_ids ?? [])
            .map((id: number) => tvGenres.get(id))
            .filter(Boolean),
          overview: item.overview ?? "",
          cast: [],
          popularity: item.popularity ?? 0,
        }));

        // Reúne e ordena os resultados.
        const results = [...movies, ...series]
          .sort((a, b) => b.popularity - a.popularity)
          .slice(0, 20);

        return Response.json({ results });

      } catch (error) {
        console.error("Erro na pesquisa:", error);

        return Response.json(
          { error: "Não foi possível consultar o TMDB." },
          { status: 502 }
        );
      }
    }
  ),
};
