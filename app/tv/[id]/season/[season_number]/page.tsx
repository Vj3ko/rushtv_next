import AnimatedComponent from 'animations/AnimatedComponent'
import { getTvShowMinorDetails, getTvShowSeasonDetails } from 'api/tvShows'
import {
  Carousel,
  CustomImg,
  OverviewText,
  Slider,
  VideoGallery,
} from 'app/components/ui'
import { formatDate, formatYear } from 'utils'

const SeasonDetails = async ({
  params,
}: {
  params: { id: string; season_number: string }
}) => {
  const season = await getTvShowSeasonDetails(params.id, params.season_number)
  const tvShow = await getTvShowMinorDetails(params.id)

  return (
    <AnimatedComponent>
      <section className='page__section'>
        <div className='wrapper'>
          <CustomImg size='w500' link={season?.poster_path} />

          <div className='container'>
            <div className='media'>
              <h1>
                {tvShow?.title ?? tvShow?.name}: {season?.name}
                {season?.air_date && (
                  <span className='year'>({formatYear(season.air_date)})</span>
                )}
              </h1>

              {season?.overview && <OverviewText text={season.overview} />}

              {season?.air_date && (
                <div>
                  <h3>Air Date</h3>
                  <p>{formatDate(season.air_date)}</p>
                </div>
              )}

              {!!season?.season_number && (
                <div>
                  <h3>Season Number</h3>
                  <p>{season.season_number}</p>
                </div>
              )}

              {!!season?.episodes && (
                <div>
                  <h3>Number of episodes</h3>
                  <p>{season.episodes.length}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className='container'>
          {season?.episodes && season?.episodes.length > 0 && (
            <section className='stats__section'>
              <h2>Episodes</h2>
              <Slider
                gallery={season.episodes}
                mediaType='episode'
                size='big'
                id={params.id}
              />
            </section>
          )}

          {season?.videos?.results && season?.videos?.results.length > 0 && (
            <section className='stats__section'>
              <h2>Trailers and videos</h2>
              <VideoGallery gallery={season.videos.results} />
            </section>
          )}

          {season?.credits?.cast && season?.credits?.cast.length > 0 && (
            <section className='stats__section'>
              <h2>Cast</h2>
              <Slider gallery={season.credits.cast} mediaType='person' />
            </section>
          )}

          {season?.images?.posters && season?.images.posters.length > 0 && (
            <section className='stats__section'>
              <h2>Images</h2>
              <Carousel data={season.images.posters} />
            </section>
          )}
        </div>
      </section>
    </AnimatedComponent>
  )
}

export default SeasonDetails
