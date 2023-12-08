import AnimatedComponent from 'animations/AnimatedComponent'
import { getTvShowDetails } from 'api/tvShows'
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
import { formatDate, formatYear, getTitle } from 'utils'

const TvShowDetails = async ({ params }: { params: { id: string } }) => {
  const tvShow = await getTvShowDetails(params.id)

  return (
    <AnimatedComponent>
      <section className='page__section'>
        {tvShow?.backdrop_path && (
          <CustomBg size='w1280' link={tvShow.backdrop_path} />
        )}
        <div className='wrapper'>
          <CustomImg size='w500' link={tvShow?.poster_path}>
            <FavoritesRibbon item={tvShow} media='tv' />
          </CustomImg>

          <div className='container'>
            <div className='media'>
              {!!tvShow?.vote_average && (
                <p>Rating: {tvShow.vote_average.toFixed(1)}</p>
              )}
              <h1>
                {tvShow?.title ?? tvShow?.name}
                {tvShow?.first_air_date && (
                  <span className='year'>
                    ({formatYear(tvShow?.first_air_date)})
                  </span>
                )}
              </h1>

              {tvShow?.tagline && <p>{tvShow.tagline}</p>}

              {tvShow && tvShow?.genres?.length > 0 && (
                <div className='genres'>
                  <div>
                    <span className='genre'>{tvShow?.genres[0].name}</span>
                    {tvShow?.genres[1] && (
                      <span className='genre'>/ {tvShow?.genres[1].name}</span>
                    )}
                  </div>
                </div>
              )}

              <div className='buttons--wrapper'>
                {tvShow?.homepage && (
                  <Button link={tvShow.homepage} text='Visit Website' />
                )}

                {tvShow?.external_ids?.imdb_id && (
                  <Button
                    link={getTitle('title', tvShow.external_ids.imdb_id)}
                    text='View on IMDB'
                  />
                )}
              </div>

              {tvShow?.overview && <OverviewText text={tvShow.overview} />}

              {!!tvShow?.number_of_seasons && (
                <div>
                  <h3>Number of seasons</h3>
                  <p>{tvShow.number_of_seasons}</p>
                </div>
              )}

              {!!tvShow?.number_of_episodes && (
                <div>
                  <h3>Number of episodes</h3>
                  <p>{tvShow.number_of_episodes}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className='container'>
          {tvShow?.first_air_date && (
            <section className='stats__section'>
              <h3>First Air Date</h3>
              <p>{formatDate(tvShow.first_air_date)}</p>
            </section>
          )}

          {tvShow?.last_episode_to_air && (
            <section className='stats__section'>
              <h3>Last Aired Episode</h3>
              <p>{tvShow.last_episode_to_air.name}</p>
              <p>{formatDate(tvShow.last_episode_to_air.air_date)}</p>
            </section>
          )}

          {tvShow?.next_episode_to_air && (
            <section className='stats__section'>
              <h3>Next Episode To Air</h3>
              <p>{tvShow.next_episode_to_air.name}</p>
              <p>{formatDate(tvShow.next_episode_to_air.air_date)}</p>
            </section>
          )}

          {tvShow?.status && (
            <section className='stats__section'>
              <h3>Status</h3>
              <p>{tvShow.status}</p>
            </section>
          )}

          {tvShow?.original_language && (
            <section className='stats__section'>
              <h3>Language</h3>
              <p className='language'>{tvShow.original_language}</p>
            </section>
          )}

          {tvShow?.genres && tvShow?.genres.length > 0 && (
            <section className='stats__section'>
              <h3>Genres</h3>
              <span>
                {tvShow.genres.map((genre: any, index: number) => {
                  if (index === tvShow.genres.length - 1) {
                    return genre.name
                  }
                  return `${genre.name}, `
                })}
              </span>
            </section>
          )}

          {tvShow?.production_companies &&
            tvShow?.production_companies.length > 0 && (
              <section className='stats__section'>
                <h3>Production Companies</h3>
                <span>
                  {tvShow.production_companies.map(
                    (company: any, index: number) => {
                      if (index === tvShow.production_companies.length - 1) {
                        return company.name
                      }
                      return `${company.name}, `
                    },
                  )}
                </span>
              </section>
            )}

          {tvShow?.seasons && tvShow?.seasons.length > 0 && (
            <section className='stats__section'>
              <h2>Seasons</h2>
              <Slider
                gallery={tvShow.seasons}
                mediaType='season'
                id={params.id}
              />
            </section>
          )}

          {tvShow?.credits?.cast && tvShow?.credits?.cast.length > 0 && (
            <section className='stats__section'>
              <h2>Cast</h2>
              <Slider gallery={tvShow.credits.cast} mediaType='person' />
            </section>
          )}

          {tvShow?.videos?.results && tvShow?.videos?.results.length > 0 && (
            <section className='stats__section'>
              <h2>Trailers and videos</h2>
              <VideoGallery gallery={tvShow.videos.results} />
            </section>
          )}

          {tvShow?.images?.backdrops && tvShow?.images.backdrops.length > 0 && (
            <section className='stats__section'>
              <h2>Images</h2>
              <Carousel data={tvShow.images.backdrops} size='big' />
            </section>
          )}

          {tvShow?.recommendations?.results &&
            tvShow?.recommendations.results.length > 0 && (
              <section className='stats__section'>
                <h2>Recommended Tv Shows</h2>
                <Slider
                  gallery={tvShow.recommendations.results}
                  mediaType='tv'
                />
              </section>
            )}

          {tvShow?.similar?.results && tvShow?.similar?.results.length > 0 && (
            <section className='stats__section'>
              <h2>Similar Tv Shows</h2>
              <Slider gallery={tvShow.similar.results} mediaType='tv' />
            </section>
          )}
        </div>
      </section>
    </AnimatedComponent>
  )
}

export default TvShowDetails
