import { useState, useEffect } from "react";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { movieService, type Movie } from "../services/movieService";
import { SearchBar } from "../components/SearchBar";
import { MovieCard } from "../components/MovieCard";

export function Main() {
  useEffect(() => {
    document.title = "Movie Search - React Movie Hooks";
  }, []);
  const navigate = useNavigate();
  const search = useSearch({ from: '/' });
  const searchQuery = search.q || '';
  const [userName, setUserName] = useState({ firstName: "", lastName: "" });
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    const userData = localStorage.getItem('user');
    
    if (!authToken || !userData) {
      navigate({ to: '/signup' });
      return;
    }

    try {
      const user = JSON.parse(userData);
      setUserName({
        firstName: user.firstName,
        lastName: user.lastName,
      });
      console.log("User loaded:", user);
    } catch (error) {
      console.error("Error loading user data:", error);
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      navigate({ to: '/signup' });
    }
  }, [navigate]);

  useEffect(() => {
    loadMovies();
  }, [searchQuery, currentPage]);

  const loadMovies = async () => {
    setIsLoading(true);
    setError(null);

    try {
      if (searchQuery) {
        const results = await movieService.searchMovies(searchQuery);
        setMovies(results);
        setTotalPages(1);
      } else {
        const response = await movieService.getPopularMovies(currentPage);
        setMovies(response.movies);
        setTotalPages(response.totalPages);
      }
    } catch (err) {
      console.error("Error loading movies:", err);
      setError("Failed to load movies. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (query: string) => {
    setCurrentPage(1);
    navigate({ 
      search: query ? { q: query } : {} 
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    navigate({ to: '/signup' });
  };

  const handleMovieClick = (movieId: string) => {
    navigate({ to: '/movie/$id', params: { id: movieId } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Movie Search
              </h1>
              <p className="text-sm text-gray-600">
                Welcome, {userName.firstName} {userName.lastName}!
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate({ to: '/settings' })}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition duration-200 flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Settings
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center mb-8">
          <SearchBar onSearch={handleSearch} initialValue={searchQuery} />
          {searchQuery && (
            <p className="mt-4 text-gray-600">
              Search results for: <span className="font-semibold">{searchQuery}</span>
            </p>
          )}
        </div>

        {error && (
          <div className="mb-8 p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
          </div>
        ) : movies.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {movies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onClick={() => handleMovieClick(movie.id)}
                />
              ))}
            </div>

            {!searchQuery && totalPages > 1 && (
              <div className="mt-8 flex justify-center gap-2">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-white text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                  Previous
                </button>
                <span className="px-4 py-2 bg-white text-gray-900 border border-gray-300 rounded-lg font-medium">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-white text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                  Next
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-600 text-lg">
              {searchQuery ? 'No movies found. Try a different search.' : 'Start searching for movies!'}
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

