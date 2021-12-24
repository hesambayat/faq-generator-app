import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addAllToBin, selectAllFromBin } from '../../store/bin'

const DeleteAll = ({ questions }) => {
  const dispatch = useDispatch()
  const bin = useSelector(selectAllFromBin)

  const handleClick = useCallback(() => {
    dispatch(addAllToBin(questions.map(n => n.id)))
  }, [dispatch, questions])

  return (
    <button onClick={handleClick}>Delete all ({bin.length}/{questions.length})</button>
  )
}

export default DeleteAll
