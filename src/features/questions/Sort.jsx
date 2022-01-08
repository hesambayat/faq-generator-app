import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectNextSort, toggleSort } from '../../store/sort'
import { Icon } from '../../components'

const Sort = () => {
  const dispatch = useDispatch()
  const sort = useSelector(selectNextSort)
  const handleClick = useCallback(() => dispatch(toggleSort()), [dispatch])

  return (
    <Icon
      icon={`sort-${sort.toLowerCase()}`}
      onClick={handleClick}
    />
  )
}

export default Sort
