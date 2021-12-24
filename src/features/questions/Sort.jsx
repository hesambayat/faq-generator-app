import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectNextSort, toggleSort } from '../../store/sort'

const Sort = () => {
  const dispatch = useDispatch()
  const sort = useSelector(selectNextSort)
  const handleClick = useCallback(() => dispatch(toggleSort()), [dispatch])

  return (
    <button onClick={handleClick}>Sort {sort}</button>
  )
}

export default Sort
