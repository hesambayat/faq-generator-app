import { useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectFocus, setFocus } from '../store/focus'

const useFocus = function (menuId) {
  const dispatch = useDispatch()
  const focus = useSelector(selectFocus)
  const isFocused = useMemo(() => focus === menuId, [focus, menuId])
  const onFocus = useCallback(() => {
    !isFocused && menuId && dispatch(setFocus(menuId))
  }, [dispatch, isFocused, menuId])

  return [isFocused, onFocus]
}

export default useFocus
