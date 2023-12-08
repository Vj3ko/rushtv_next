import GenreList from 'app/components/list/GenreList'

const GenrePage = ({
  params,
}: {
  params: { type: string; genreType: string }
}) => {
  const { type, genreType } = params

  return (
    <>
      {/* MOVIE GENRES */}

      {/* action */}
      {type === 'movies' && genreType === 'action' && (
        <GenreList mediaType='movie' title='Action movies' genre='28' />
      )}

      {/* adventure */}
      {type === 'movies' && genreType === 'adventure' && (
        <GenreList mediaType='movie' title='Adventure movies' genre='12' />
      )}

      {/* comedy */}
      {type === 'movies' && genreType === 'comedy' && (
        <GenreList mediaType='movie' title='Comedy movies' genre='35' />
      )}

      {/* crime */}
      {type === 'movies' && genreType === 'crime' && (
        <GenreList mediaType='movie' title='Crime movies' genre='80' />
      )}

      {/* drama */}
      {type === 'movies' && genreType === 'drama' && (
        <GenreList mediaType='movie' title='Drama movies' genre='18' />
      )}

      {/* documentary */}
      {type === 'movies' && genreType === 'documentary' && (
        <GenreList mediaType='movie' title='Documentary movies' genre='99' />
      )}

      {/* horror */}
      {type === 'movies' && genreType === 'horror' && (
        <GenreList mediaType='movie' title='Horror movies' genre='27' />
      )}

      {/* mystery */}
      {type === 'movies' && genreType === 'mystery' && (
        <GenreList mediaType='movie' title='Mystery movies' genre='9648' />
      )}

      {/* romance */}
      {type === 'movies' && genreType === 'romance' && (
        <GenreList mediaType='movie' title='Romance movies' genre='28' />
      )}

      {/* sci-fi & fantasy */}
      {type === 'movies' && genreType === 'sci-fi%26fantasy' && (
        <GenreList
          mediaType='movie'
          title='SCI-FI & Fantasy movies'
          genre='14,878'
        />
      )}

      {/* thriller */}
      {type === 'movies' && genreType === 'thriller' && (
        <GenreList mediaType='movie' title='Thriller movies' genre='53' />
      )}

      {/* TV GENRES */}

      {/* action and adventure */}
      {type === 'tv' && genreType === 'action%26adventure' && (
        <GenreList
          mediaType='tv'
          title='Action & Adventure tv shows'
          genre='10759'
        />
      )}

      {/* comedy */}
      {type === 'tv' && genreType === 'comedy' && (
        <GenreList mediaType='tv' title='Comedy tv shows' genre='35' />
      )}

      {/* crime */}
      {type === 'tv' && genreType === 'crime' && (
        <GenreList mediaType='tv' title='Crime tv shows' genre='80' />
      )}

      {/* drama */}
      {type === 'tv' && genreType === 'drama' && (
        <GenreList mediaType='tv' title='Drama tv shows' genre='18' />
      )}

      {/* documentary */}
      {type === 'tv' && genreType === 'documentary' && (
        <GenreList mediaType='tv' title='Documentary tv shows' genre='99' />
      )}

      {/* family */}
      {type === 'tv' && genreType === 'family' && (
        <GenreList mediaType='tv' title='Family tv shows' genre='10751' />
      )}

      {/* kids */}
      {type === 'tv' && genreType === 'kids' && (
        <GenreList mediaType='tv' title='Kids tv shows' genre='10762' />
      )}

      {/* mystery */}
      {type === 'tv' && genreType === 'mystery' && (
        <GenreList mediaType='tv' title='Mystery tv shows' genre='9648' />
      )}

      {/* reality */}
      {type === 'tv' && genreType === 'reality' && (
        <GenreList mediaType='tv' title='Reality tv shows' genre='10764' />
      )}

      {/* romance */}
      {type === 'tv' && genreType === 'romance' && (
        <GenreList mediaType='tv' title='Romance tv shows' genre='10749' />
      )}

      {/* soap */}
      {type === 'tv' && genreType === 'soap' && (
        <GenreList mediaType='tv' title='Soap tv shows' genre='10766' />
      )}

      {/* sci-fi & fantasy */}
      {type === 'tv' && genreType === 'sci-fi%26fantasy' && (
        <GenreList
          mediaType='tv'
          title='SCI-FI & Fantasy tv shows'
          genre='10765'
        />
      )}
    </>
  )
}

export default GenrePage
