import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addAllToBin, selectAllFromBin } from '../../store/bin'
import { Icon } from '../../components'

const DeleteAll = ({ questions }) => {
  const dispatch = useDispatch()
  const bin = useSelector(selectAllFromBin)

  const handleClick = useCallback(() => {
    dispatch(addAllToBin(questions.map(n => n.id)))
  }, [dispatch, questions])

  return (
    <Icon
      icon={`bin${bin.length ? bin.length === questions.length ? '-added' : '-add' : ''}`}
      onClick={handleClick}
    />
  )
}

export default DeleteAll
