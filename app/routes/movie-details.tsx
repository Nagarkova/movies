import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import type { Route } from "./+types/movie-details";
import { movieService, type TmdbMovie } from "../services/movieService";
import { MovieDetails } from "../components/MovieDetails";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Movie Details - React Movie Hooks" },
    { name: "description", content: "View movie details" },
  ];
}

export default function MovieDetailsPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [movie, setMovie] = useState<TmdbMovie | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    
    if (!authToken) {
      navigate('/signup');
      return;
    }

    if (id) {
      loadMovieDetails(id);
    }
  }, [id, navigate]);

  const loadMovieDetails = async (movieId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await movieService.getMovieDetailsById(movieId);
      if (data) {
        setMovie(data);
      } else {
        setError("Movie not found");
      }
    } catch (err) {
      console.error("Error loading movie details:", err);
      setError("Failed to load movie details. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToMain = () => {
    navigate('/');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading movie details...</p>
        </div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="mb-6">
            <svg
              className="w-24 h-24 text-red-500 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {error || "Movie not found"}
          </h2>
          <p className="text-gray-600 mb-6">
            We couldn't load the movie details. Please try again.
          </p>
          <button
            onClick={handleBackToMain}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 font-medium"
          >
            Back to Movies
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <button
              onClick={handleBackToMain}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition duration-200"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              <span className="font-medium">Back to Movies</span>
            </button>
          </div>
        </div>
      </header>

      <MovieDetails movie={movie} />
    </div>
  );
}

