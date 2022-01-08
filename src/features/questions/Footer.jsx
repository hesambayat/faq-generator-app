import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useDeleteQuestionsMutation } from '../../services/questions'
import { clearBin, selectAllFromBin } from '../../store/bin'
import { Button } from '../../components'

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
    <div className="footer">
      <div className="footer__container">
        <div className="footer__row">
          <div className="footer__actions">
            <Button
              disabled={isLoading}
              onClick={restore}
            >Cancel</Button>
            <Button
              variant="secondary"
              disabled={isLoading}
              onClick={emptyBin}
            ><span>Delete <i>{bin.length}</i></span></Button>
          </div>
        </div>
      </div>
    </div>
  )

}

export default Footer