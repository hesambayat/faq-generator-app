import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { selectQuestions } from '../store'

const Hint = (({ length }) => {
  const count = useMemo(() =>
    length === 0 ? 'no questions' :
    length === 1 ? 'one question' : `${length} questions`
  , [length])

  return (
    <p>Here you can find {count}. Feel free to create your own question :)</p>
  )
})

const Questions = () => {
  const faq = useSelector(selectQuestions)

  return (
    <div className="questions">
      <h2>Questions</h2>
      <button>Sort a-z</button>
      <button>Delete all</button>
      <Hint length={faq.length} />
      {faq.length > 0 ? (
        faq.map((item) => (
          <div key={item.id} className="questions__item">
            <div className="questions__item__question">
              <h3>{item.question}</h3>
            </div>
            <div className="questions__item__answer">
              <p>{item.answer}</p>
            </div>
          </div>
        ))
      ) : <p>No questions yet</p>}
    </div>
  )
}

export default Questions
