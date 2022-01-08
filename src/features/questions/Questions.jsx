import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useGetQuestionsQuery } from '../../services/questions'
import { selectSortAlgorithm } from '../../store/sort'
import { Alert } from '../../components'
import DeleteAll from './DeleteAll'
import Hint from './Hint'
import Info from './Info'
import Question from './Question'
import Sort from './Sort'

const Questions = () => {
  const { data, isLoading } = useGetQuestionsQuery()
  const algorithm = useSelector(selectSortAlgorithm)
  const questions = useMemo(() => [...data || []].sort(algorithm), [data, algorithm])

  if (isLoading) {
    return 'loading'
  }

  return (
    <div className="questions">
      <div className="questions__header">
        <h2>
          Questions
          <Info>
            Here you can find the <strong>created</strong> questions <br/>& their answers.
          </Info>
        </h2>
        {questions.length > 0 && (
          <div className="questions__header__actions">
            {questions.length > 1 && <Sort />}
            <DeleteAll questions={questions} />
          </div>
        )}
      </div>
      <Hint length={questions.length} />
      {questions.length > 0 
        ? questions.map((item) => <Question key={item.id} item={item} />)
        : <Alert variant="info">No questions yet.</Alert>
      }
    </div>
  )
}

export default Questions
