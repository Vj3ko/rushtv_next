import React from 'react'

const ResultsCom = ({ results }: { results: number }) => {
  console.log('Results rendered')
  return (
    <p>
      A total of {results} {results === 1 ? 'result' : 'results'} has been
      found!
    </p>
  )
}

export const Results = React.memo(ResultsCom)
