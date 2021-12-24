import { useMemo } from 'react'

const Hint = (({ length }) => {
  const count = useMemo(() =>
    length === 0 ? 'no questions' :
    length === 1 ? 'one question' : `${length} questions`
  , [length])

  return (
    <p>Here you can find {count}. Feel free to create your own question :)</p>
  )
})

export default Hint