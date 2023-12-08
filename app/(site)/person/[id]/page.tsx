import AnimatedComponent from 'animations/AnimatedComponent'
import {
  Button,
  Carousel,
  CustomImg,
  FavoritesRibbon,
  OverviewText,
  Slider,
} from 'app/components/ui'
import { getPersonDetails } from 'routes/person'
import {
  calculateAge,
  calculateLifeSpan,
  formatDate,
  getGender,
  getTitle,
} from 'utils'

const PersonDetails = async ({ params }: { params: { id: string } }) => {
  const person = await getPersonDetails(params.id)

  return (
    <AnimatedComponent>
      <section className='page__section'>
        <div className='wrapper'>
          <CustomImg size='w500' link={person?.profile_path}>
            <FavoritesRibbon item={person} media='people' />
          </CustomImg>

          <div className='container'>
            <div className='media'>
              <h1>{person?.name}</h1>

              <div className='buttons--wrapper'>
                {person?.imdb_id && (
                  <Button
                    link={getTitle('name', person.imdb_id)}
                    text='View on IMDB'
                  />
                )}
              </div>

              {person?.biography && (
                <OverviewText text={person.biography} type='person' />
              )}

              {person?.deathday &&
              person?.birthday &&
              person?.deathday !== null ? (
                <div>
                  <h3>Date of birth</h3>
                  <span>
                    {formatDate(person?.birthday)} -{' '}
                    {formatDate(person?.deathday)} (died at{' '}
                    {calculateLifeSpan(person?.birthday, person?.deathday)})
                  </span>
                </div>
              ) : (
                <div>
                  <h3>Date of birth</h3>
                  <span>
                    {formatDate(person?.birthday!)} (
                    {calculateAge(person?.birthday!)} years old)
                  </span>
                </div>
              )}

              {!!person?.place_of_birth && (
                <div>
                  <h3>Place of birth</h3>
                  <span>{person.place_of_birth}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className='container'>
          {!!person?.gender && (
            <section className='stats__section'>
              <h3>Gender</h3>
              <span>{getGender(person.gender)}</span>
            </section>
          )}

          {person?.known_for_department && (
            <section className='stats__section'>
              <h3>Known for</h3>
              <span>{person.known_for_department}</span>
            </section>
          )}

          {person?.also_known_as && person?.also_known_as.length > 0 && (
            <section className='stats__section'>
              <h3>Also known as</h3>
              <ul className='aka'>
                {person.also_known_as.map((item: any) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          )}

          {(person?.external_ids?.instagram_id ||
            person?.external_ids.facebook_id ||
            person?.external_ids?.twitter_id) && (
            <section className='stats__section'>
              <h3>Social Media</h3>
              {person.external_ids.instagram_id && (
                <p>
                  <a
                    className='socialmedia--link'
                    rel='noreferrer'
                    target='_blank'
                    href={`https://instagram.com/${person.external_ids.instagram_id}`}>
                    Instagram
                  </a>
                </p>
              )}
              {person.external_ids.facebook_id && (
                <p>
                  <a
                    className='socialmedia--link'
                    rel='noreferrer'
                    target='_blank'
                    href={`https://facebook.com/${person.external_ids.facebook_id}`}>
                    Facebook
                  </a>
                </p>
              )}
              {person.external_ids.twitter_id && (
                <p>
                  {' '}
                  <a
                    className='socialmedia--link'
                    rel='noreferrer'
                    target='_blank'
                    href={`https://twitter.com/${person.external_ids.twitter_id}`}>
                    Twitter
                  </a>
                </p>
              )}
            </section>
          )}

          {person?.images?.profiles && person?.images?.profiles.length > 0 && (
            <section className='stats__section'>
              <h2>Images</h2>
              <Carousel data={person.images.profiles} />
            </section>
          )}

          {person?.credits?.cast && person?.credits?.cast.length > 0 && (
            <section className='stats__section'>
              <h2>Known for</h2>
              <Slider gallery={person.credits.cast} mediaType='movie' />
            </section>
          )}
        </div>
      </section>
    </AnimatedComponent>
  )
}

export default PersonDetails
