import { useEffect, useCallback, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useUpdateQuestionMutation } from '../../services/questions'
import { addToBin, removeFromBin, selectAllFromBin } from '../../store/bin'
import { Icon, Editor } from '../../components'

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
        updateQuestion({ ...content, id: item.id })
      }
    }, THRESHOLD)

    return () => {
      clearTimeout(timeout)
    }
  }, [item, content, updateQuestion])

  return (
    <div className={`questions__item${isMarked ? ' questions__item--marked' : ''}`}>
      <Editor menuId={item.id} content={content.question} onChange={setContent} canEdit />
      {/* <p>{error}</p> */}
      {isLoading && <p className="questions__item__notice">Saving changes…</p>}
      <Icon
        className="icon questions__item__delete"
        icon={`bin${bin.length ? isMarked ? '-remove' : '-add' : ''}`}
        onClick={handleDelete}
      />
    </div>
  )
}

export default Question
