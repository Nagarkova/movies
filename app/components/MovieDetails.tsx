import type { TmdbMovie } from "../services/movieService";

interface MovieDetailsProps {
  movie: TmdbMovie;
}

export function MovieDetails({ movie }: MovieDetailsProps) {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : null;

  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : null;

  const formatRuntime = (minutes?: number) => {
    if (!minutes) return "N/A";
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const formatMoney = (amount?: number) => {
    if (!amount) return "N/A";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {backdropUrl && (
        <div
          className="relative h-96 bg-cover bg-center"
          style={{ backgroundImage: `url(${backdropUrl})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent"></div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className={`${backdropUrl ? "-mt-64 relative z-10" : ""}`}>
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="md:flex">
              {posterUrl && (
                <div className="md:flex-shrink-0">
                  <img
                    src={posterUrl}
                    alt={movie.title}
                    className="h-full w-full md:w-80 object-cover"
                  />
                </div>
              )}

              <div className="p-8 flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">
                      {movie.title}
                    </h1>
                    {movie.tagline && (
                      <p className="text-lg text-gray-600 italic mb-4">
                        "{movie.tagline}"
                      </p>
                    )}
                  </div>
                  <div className="flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex-shrink-0 ml-4">
                    <span className="text-white font-bold text-2xl">
                      {movie.vote_average.toFixed(1)}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {movie.genres?.map((genre) => (
                    <span
                      key={genre.id}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Release Date</p>
                    <p className="text-gray-900 font-semibold">
                      {movie.release_date
                        ? new Date(movie.release_date).toLocaleDateString()
                        : "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Runtime</p>
                    <p className="text-gray-900 font-semibold">
                      {formatRuntime(movie.runtime)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Status</p>
                    <p className="text-gray-900 font-semibold">
                      {movie.status || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Language</p>
                    <p className="text-gray-900 font-semibold uppercase">
                      {movie.original_language || "N/A"}
                    </p>
                  </div>
                </div>

                {movie.overview && (
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-3">
                      Overview
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                      {movie.overview}
                    </p>
                  </div>
                )}

                {(movie.budget || movie.revenue) && (
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {movie.budget && movie.budget > 0 && (
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Budget</p>
                        <p className="text-gray-900 font-semibold text-lg">
                          {formatMoney(movie.budget)}
                        </p>
                      </div>
                    )}
                    {movie.revenue && movie.revenue > 0 && (
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Revenue</p>
                        <p className="text-gray-900 font-semibold text-lg">
                          {formatMoney(movie.revenue)}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {movie.production_companies &&
                  movie.production_companies.length > 0 && (
                    <div className="mb-6">
                      <h2 className="text-xl font-semibold text-gray-900 mb-3">
                        Production Companies
                      </h2>
                      <div className="flex flex-wrap gap-3">
                        {movie.production_companies.map((company) => (
                          <div
                            key={company.id}
                            className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg"
                          >
                            {company.logo_path && (
                              <img
                                src={`https://image.tmdb.org/t/p/w92${company.logo_path}`}
                                alt={company.name}
                                className="h-6 object-contain"
                              />
                            )}
                            <span className="text-sm text-gray-900">
                              {company.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                <div className="flex gap-4 pt-6 border-t border-gray-200">
                  {movie.homepage && (
                    <a
                      href={movie.homepage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 font-medium"
                    >
                      Official Website
                    </a>
                  )}
                  {movie.imdb_id && (
                    <a
                      href={`https://www.imdb.com/title/${movie.imdb_id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 bg-yellow-500 text-gray-900 rounded-lg hover:bg-yellow-600 transition duration-200 font-medium"
                    >
                      View on IMDb
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

