import { useEffect, useCallback, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useUpdateQuestionMutation } from '../../services/questions'
import { addToBin, removeFromBin, selectAllFromBin } from '../../store/bin'
import { Editor } from '../../components'

let timeout
const THRESHOLD = 300

const Question = ({ item }) => {
  const [content, setContent] = useState({
    question: item.question,
    fullText: item.fullText
  })
  const [updateQuestion, { isLoading, error }] = useUpdateQuestionMutation()
  const dispatch = useDispatch()
  const bin = useSelector(selectAllFromBin)
  const isMarked = useMemo(() => bin.includes(item.id), [bin, item.id])
  const handleDelete = useCallback(() => {
    isMarked ? dispatch(removeFromBin(item.id)) : dispatch(addToBin(item.id))
  }, [isMarked, dispatch, item.id])

  useEffect(() => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      if (item.fullText !== content.fullText 
        && JSON.stringify(item.question) !== JSON.stringify(content.question)) {
        updateQuestion({...content, id: item.id})
      }
    }, THRESHOLD)

    return () => {
      clearTimeout(timeout)
    }
  }, [item, content])

  return (
    <div className="questions__item">
      <div className="questions__item__question">
        <Editor menuId={item.id} content={content.question} onChange={setContent} canEdit />
      </div>
      <p>{error}</p>
      <p>{isLoading ? 'Saving changes…' : ''}</p>
      <button onClick={handleDelete}>{isMarked ? 'Restore' : 'Remove'}</button>
    </div>
  )
}

export default Question
