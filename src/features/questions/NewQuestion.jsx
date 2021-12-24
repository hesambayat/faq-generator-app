import { useCallback, useMemo, useState } from 'react'
import { useAddQuestionMutation } from '../../services/questions'
import { Editor } from '../../components'
import AddDelay from './AddDelay'

const NewQuestion = () => {
  const [content, setContent] = useState()
  const [addQuestion, { isLoading, error }] = useAddQuestionMutation()
  const canSubmit = useMemo(() => {
    return content?.fullText?.trim()?.length > 0
  }, [content])

  const handleSubmit = useCallback(async () => {
    if (canSubmit) {
      await addQuestion(content)
      setContent('')
    }
  }, [addQuestion, setContent, content, canSubmit])

  return (
    <div className="new-question">
      <h1>Create a new question</h1>
      <Editor menuId="new-question" content={content?.question} onChange={setContent} canEdit={!isLoading} />
      <p>{error}</p>
      <AddDelay />
      <button
        onClick={handleSubmit}
        disabled={!canSubmit || isLoading}
      >Create question</button>
    </div>
  )
}

export default NewQuestion
