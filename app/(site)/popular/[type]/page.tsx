import PopularList from 'app/components/list/PopularList'

const PopularPage = ({ params }: { params: { type: string } }) => {
  const { type } = params

  return (
    <>
      {type === 'movies' && <PopularList mediaType='movie' title='movies' />}
      {type === 'tv' && <PopularList mediaType='tv' title='tv shows' />}
      {type === 'people' && <PopularList mediaType='person' title='people' />}
    </>
  )
}

export default PopularPage
