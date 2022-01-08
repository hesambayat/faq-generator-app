import { useMemo } from 'react'

const Hint = (({ length }) => {
  const count = useMemo(() =>
    length === 0 ? 'no questions' :
    length === 1 ? 'one question' : `${length} questions`
  , [length])

  return (
    <p className="questions__hint">Here you can find {count}. <br/>Feel free to create your own question :)</p>
  )
})

export default Hint