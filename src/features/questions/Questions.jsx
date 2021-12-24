import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useGetQuestionsQuery } from '../../services/questions'
import { selectSortAlgorithm } from '../../store/sort'
import DeleteAll from './DeleteAll'
import Hint from './Hint'
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
      <h2>Questions</h2>
      {questions.length > 1 && <Sort />}
      {questions.length > 0 && <DeleteAll questions={questions} />}
      <Hint length={questions.length} />
      {questions.length > 0 
        ? questions.map((item) => <Question key={item.id} item={item} />)
        : <p>No questions yet</p>
      }
    </div>
  )
}

export default Questions
