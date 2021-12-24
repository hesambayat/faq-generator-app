import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useGetQuestionsQuery } from '../../services/questions'
import { selectSortAlgorithm } from '../../store/sort'

const Debug = () => {
  const { data, isLoading } = useGetQuestionsQuery()
  const algorithm = useSelector(selectSortAlgorithm)
  const questions = useMemo(() => [...data || []].sort(algorithm), [data, algorithm])

  if (isLoading) {
    return 'loading'
  }

  return (
    <div className="debug">
      {questions.length > 0 
        ? questions.map((item) => <p key={item.id}>{JSON.stringify(item)}</p>)
        : <p>No questions yet</p>
      }
    </div>
  )
}

export default Debug
