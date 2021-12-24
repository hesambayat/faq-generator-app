import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useDeleteQuestionsMutation } from '../../services/questions'
import { clearBin, selectAllFromBin } from '../../store/bin'

const Footer = () => {
  const dispatch = useDispatch()
  const bin = useSelector(selectAllFromBin)
  const [deleteQuestions, { isLoading }] = useDeleteQuestionsMutation()
  const restore = useCallback(() => dispatch(clearBin()), [dispatch])
  const emptyBin = useCallback(async () => {
    try {
      await deleteQuestions(bin)
      restore()
    } catch (error) {
      // Handle error here
      console.error(error)      
    }
  }, [deleteQuestions, restore, bin])

  if (bin.length === 0) {
    return null
  }

  return (
    <>
      <button onClick={restore} disabled={isLoading}>Cancel</button>
      <button onClick={emptyBin} disabled={isLoading}>Delete ({bin.length})</button>
    </>
  )

}

export default Footer