import CustomList from 'app/components/list/CustomList'
import NotFound from 'app/not-found'

const CustomPage = ({ params }: { params: any }) => {
  const { custom } = params

  const renderContent = () => {
    if (custom[0] === 'upcoming') {
      return (
        <CustomList mediaType='movie' title='Upcoming movies' type='upcoming' />
      )
    } else if (custom[0] === 'theatre') {
      return (
        <CustomList
          mediaType='movie'
          title='Movies currently in Theatres'
          type='now_playing'
        />
      )
    } else if (custom[0] === 'on-the-air') {
      return (
        <CustomList
          mediaType='tv'
          title='Tv Shows currently on the air'
          type='on_the_air'
        />
      )
    } else if (custom[0] === 'airing-today') {
      return (
        <CustomList
          mediaType='tv'
          title='Airing today tv shows'
          type='airing_today'
        />
      )
    } else {
      return <NotFound />
    }
  }

  return <>{renderContent()}</>
}

export default CustomPage
