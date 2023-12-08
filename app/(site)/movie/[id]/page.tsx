import AnimatedComponent from 'animations/AnimatedComponent'
import {
  Button,
  Carousel,
  CustomBg,
  CustomImg,
  FavoritesRibbon,
  OverviewText,
  Slider,
  VideoGallery,
} from 'app/components/ui'
import { BiTime } from 'react-icons/bi'
import { getMovieDetails } from 'routes/movies'
import { MovieType } from 'types/movie'
import { formatCurrency, formatDate, formatYear, getTitle } from 'utils'

const ICON_SIZE = 20

const MovieDetails = async ({ params }: { params: { id: string } }) => {
  const movie: MovieType = await getMovieDetails(params.id)

  return (
    <AnimatedComponent>
      <section className='page__section'>
        {movie?.backdrop_path && (
          <CustomBg size='w1280' link={movie.backdrop_path} />
        )}
        <div className='wrapper'>
          <CustomImg size='w500' link={movie?.poster_path}>
            <FavoritesRibbon item={movie} media='movies' />
          </CustomImg>

          <div className='container'>
            <div className='media'>
              {!!movie?.vote_average && (
                <p>Rating: {movie.vote_average.toFixed(1)}</p>
              )}
              <h1>
                {movie?.title}
                {movie?.release_date && (
                  <span className='year'>
                    ({formatYear(movie.release_date)})
                  </span>
                )}
              </h1>

              <div className='genres'>
                {movie?.genres && movie?.genres.length > 0 && (
                  <div>
                    <span className='genre'>{movie.genres[0].name}</span>
                    {movie?.genres[1] && (
                      <span className='genre'>/ {movie?.genres[1].name}</span>
                    )}
                  </div>
                )}

                {!!movie?.runtime && (
                  <span className='runtime'>
                    <BiTime color='white' size={ICON_SIZE} />
                    <em style={{ whiteSpace: 'nowrap' }}>
                      {movie.runtime} min
                    </em>
                  </span>
                )}
              </div>

              <div className='buttons--wrapper'>
                {movie?.homepage && (
                  <Button link={movie.homepage} text='Visit Website' />
                )}

                {movie?.external_ids?.imdb_id && (
                  <Button
                    link={getTitle('title', movie.external_ids.imdb_id)}
                    text='View on IMDB'
                  />
                )}
              </div>

              {movie?.overview && <OverviewText text={movie.overview} />}

              {!!movie?.revenue && (
                <div>
                  <h3>Revenue</h3>
                  <span>{formatCurrency(movie.revenue)}</span>
                </div>
              )}

              {!!movie?.budget && (
                <div>
                  <h3>Budget</h3>
                  <span>{formatCurrency(movie.budget)}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className='container'>
          {movie?.release_date && (
            <div className='stats__section'>
              <h3>Release Date</h3>
              <span>{formatDate(movie.release_date)}</span>
            </div>
          )}

          {movie?.status && (
            <div className='stats__section'>
              <h3>Status</h3>
              <span>{movie.status}</span>
            </div>
          )}

          {movie?.original_language && (
            <div className='stats__section'>
              <h3>Language</h3>
              <span className='language'>{movie.original_language}</span>
            </div>
          )}

          {movie?.genres && movie?.genres.length > 0 && (
            <div className='stats__section'>
              <h3>Genres</h3>
              <span>
                {movie.genres.map((genre: any, index: number) => {
                  if (index === movie.genres.length - 1) {
                    return genre.name
                  }
                  return `${genre.name}, `
                })}
              </span>
            </div>
          )}

          {movie?.production_companies &&
            movie?.production_companies.length > 0 && (
              <div className='stats__section'>
                <h3>Production Companies</h3>
                <span>
                  {movie.production_companies.map(
                    (company: any, index: number) => {
                      if (index === movie.production_companies.length - 1) {
                        return company.name
                      }
                      return `${company.name}, `
                    },
                  )}
                </span>
              </div>
            )}

          {movie?.credits?.cast && movie?.credits?.cast.length > 0 && (
            <div className='stats__section'>
              <h2>Cast</h2>
              <Slider gallery={movie.credits.cast} mediaType='person' />
            </div>
          )}

          {movie?.videos?.results && movie?.videos?.results.length > 0 && (
            <div className='stats__section'>
              <h2>Trailers and videos</h2>
              <VideoGallery gallery={movie.videos.results} />
            </div>
          )}

          {movie?.images?.backdrops && movie?.images?.backdrops.length > 0 && (
            <div className='stats__section'>
              <h2>Images</h2>
              <Carousel data={movie.images.backdrops} size='big' />
            </div>
          )}

          {movie?.recommendations?.results &&
            movie?.recommendations?.results.length > 0 && (
              <div className='stats__section'>
                <h2>Recommended Movies</h2>
                <Slider
                  gallery={movie.recommendations.results}
                  mediaType='movie'
                />
              </div>
            )}

          {movie?.similar?.results && movie?.similar?.results.length > 0 && (
            <div className='stats__section'>
              <h2>Similar Movies</h2>
              <Slider gallery={movie.similar.results} mediaType='movie' />
            </div>
          )}
        </div>
      </section>
    </AnimatedComponent>
  )
}

export default MovieDetails
