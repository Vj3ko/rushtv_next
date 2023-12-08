import TopRatedList from 'app/components/list/TopRatedList'

const TopRatedPage = ({ params }: { params: { type: string } }) => {
  const { type } = params

  return (
    <>
      {type === 'movies' && <TopRatedList mediaType='movie' title='movies' />}
      {type === 'tv' && <TopRatedList mediaType='tv' title='tv shows' />}
    </>
  )
}

export default TopRatedPage
