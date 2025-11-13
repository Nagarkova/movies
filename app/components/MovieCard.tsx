import type { Movie } from "../services/movieService";

interface MovieCardProps {
  movie: Movie;
  onClick?: () => void;
}

export function MovieCard({ movie, onClick }: MovieCardProps) {
  return (
    <div
      className="movie-card bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform duration-200 hover:scale-105 hover:shadow-xl"
      onClick={onClick}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick?.();
        }
      }}
    >
      <div className="poster relative aspect-[2/3] bg-gray-200">
        {movie.poster ? (
          <img
            src={movie.poster}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            No image
          </div>
        )}
      </div>
      <div className="movie-info p-4">
        <h3 
          className="text-lg font-semibold text-gray-900 mb-2 h-14 overflow-hidden"
          style={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            lineHeight: '1.75rem'
          }}
        >
          {movie.title}
        </h3>
        <p className="text-sm text-gray-600 mb-2">
          {movie.year} {movie.runtime && `• ${movie.runtime}`}
        </p>
        {movie.voteAverage !== undefined && (
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500">
              <span className="text-white font-bold text-sm">
                {movie.voteAverage.toFixed(1)}
              </span>
            </div>
            <span className="text-xs text-gray-500">Rating</span>
          </div>
        )}
      </div>
    </div>
  );
}

