import AnimatedComponent from 'animations/AnimatedComponent'
import { getTvShowEpisodeDetails, getTvShowMinorDetails } from 'api/tvShows'
import {
  Carousel,
  CustomBg,
  OverviewText,
  Slider,
  VideoGallery,
} from 'app/components/ui'
import { BiTime } from 'react-icons/bi'
import { formatDate, formatYear } from 'utils'

const EpisodeDetails = async ({
  params,
}: {
  params: { id: string; season_number: string; episode_number: string }
}) => {
  const { id, season_number, episode_number } = params
  const episode = await getTvShowEpisodeDetails(
    id,
    season_number,
    episode_number,
  )
  const tvShow = await getTvShowMinorDetails(params.id)

  return (
    <AnimatedComponent>
      <section className='page__section'>
        <div className='wrapper episode'>
          {episode?.still_path && (
            <CustomBg size='w1280' link={episode.still_path} />
          )}

          <div className='container'>
            <div className='media'>
              <h1>
                {tvShow?.title ?? tvShow?.name}: {episode?.name}
                {episode?.air_date && (
                  <span className='year'>({formatYear(episode.air_date)})</span>
                )}
              </h1>

              {!!episode?.vote_average && (
                <p>Rating: {episode.vote_average.toFixed(1)}</p>
              )}

              {!!episode?.runtime && (
                <span className='runtime'>
                  <BiTime color='white' size={20} />
                  <em style={{ whiteSpace: 'nowrap' }}>
                    {episode.runtime} min
                  </em>
                </span>
              )}

              {episode?.overview && <OverviewText text={episode.overview} />}

              {episode?.air_date && (
                <div>
                  <h3>Air Date</h3>
                  <p>{formatDate(episode.air_date)}</p>
                </div>
              )}

              {!!episode?.season_number && (
                <div>
                  <h3>Season Number</h3>
                  <p>{episode.season_number}</p>
                </div>
              )}

              {!!episode?.episode_number && (
                <div>
                  <h3>Episode Number</h3>
                  <p>{episode.episode_number}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className='container'>
          {episode?.videos?.results && episode?.videos?.results.length > 0 && (
            <section className='stats__section'>
              <h2>Trailers and videos</h2>
              <VideoGallery gallery={episode.videos.results} />
            </section>
          )}

          {episode?.guest_stars && episode?.guest_stars.length > 0 && (
            <section className='stats__section'>
              <h2>Guest Stars</h2>
              <Slider gallery={episode.guest_stars} mediaType='person' />
            </section>
          )}

          {episode?.credits?.cast && episode?.credits?.cast.length > 0 && (
            <section className='stats__section'>
              <h2>Cast</h2>
              <Slider gallery={episode.credits.cast} mediaType='person' />
            </section>
          )}

          {episode?.images?.stills && episode?.images?.stills.length > 0 && (
            <section className='stats__section'>
              <h2>Images</h2>
              <Carousel data={episode.images.stills} size='big' />
            </section>
          )}
        </div>
      </section>
    </AnimatedComponent>
  )
}

export default EpisodeDetails
