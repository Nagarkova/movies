const TMDB_API_KEY = '82bc44355e4309b23b4aaa0b48a5c532';
const TMDB_ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MmJjNDQzNTVlNDMwOWIyM2I0YWFhMGI0OGE1YzUzMiIsIm5iZiI6MTc0NzIyNzQyNi41ODA5OTk5LCJzdWIiOiI2ODI0OTMyMjg3NTQwMTFlYjI0YjRkNTkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.TF8VYFqqPI72t_h2S4nkVQZ_izralej5ZA6jUlw1RYA';

export interface Movie {
  id: string;
  title: string;
  year: string;
  runtime: string;
  poster?: string;
  voteAverage?: number;
}

export interface TmdbMovie {
  id: number;
  title: string;
  release_date: string;
  poster_path: string | null;
  vote_average: number;
  tagline?: string;
  overview?: string;
  genres?: { id: number; name: string }[];
  status?: string;
  runtime?: number;
  budget?: number;
  revenue?: number;
  homepage?: string;
  backdrop_path?: string | null;
  imdb_id?: string;
  original_language?: string;
  original_title?: string;
  popularity?: number;
  vote_count?: number;
}

interface TmdbRawResponse {
  page: number;
  results: TmdbMovie[];
  total_pages: number;
  total_results: number;
}

export interface MovieApiResponse {
  page: number;
  totalPages: number;
  movies: Movie[];
}

const headers = {
  Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
  accept: 'application/json',
};

export const movieService = {
  async getPopularMovies(page: number = 1): Promise<MovieApiResponse> {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?page=${page}`,
      { headers }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch popular movies');
    }

    const data: TmdbRawResponse = await response.json();

    return {
      page: data.page,
      totalPages: data.total_pages,
      movies: data.results.map((item) => ({
        id: item.id?.toString() ?? '',
        title: item.title,
        year: item.release_date ? item.release_date.split('-')[0] : '',
        runtime: '',
        poster: item.poster_path
          ? `https://image.tmdb.org/t/p/w300${item.poster_path}`
          : undefined,
        voteAverage: item.vote_average || 0,
      })),
    };
  },

  async searchMovies(query: string): Promise<Movie[]> {
    if (!query || query.trim() === '') {
      return [];
    }

    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}`,
      { headers }
    );

    if (!response.ok) {
      throw new Error('Failed to search movies');
    }

    const data: TmdbRawResponse = await response.json();

    return data.results.map((item) => ({
      id: item.id?.toString() ?? '',
      title: item.title,
      year: item.release_date ? item.release_date.split('-')[0] : '',
      runtime: '',
      poster: item.poster_path
        ? `https://image.tmdb.org/t/p/w300${item.poster_path}`
        : undefined,
      voteAverage: item.vote_average || 0,
    }));
  },

  async getMovieDetailsById(id: string): Promise<TmdbMovie | null> {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}`,
      { headers }
    );

    if (!response.ok) {
      return null;
    }

    const data: TmdbMovie = await response.json();
    return data;
  },
};

