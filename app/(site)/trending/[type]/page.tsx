import TrendingList from 'app/components/list/TrendingList'

const TrendingPage = ({ params }: { params: any }) => {
  const { type } = params

  return (
    <>
      {type === 'movies' && (
        <TrendingList mediaType='movie' title='movies' timeline='week' />
      )}
      {type === 'tv' && (
        <TrendingList mediaType='tv' title='tv shows' timeline='week' />
      )}
      {type === 'people' && (
        <TrendingList mediaType='person' title='people' timeline='week' />
      )}
    </>
  )
}

export default TrendingPage
