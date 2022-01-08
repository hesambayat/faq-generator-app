import { useCallback, useMemo, useState } from 'react'
import { useAddQuestionMutation } from '../../services/questions'
import { Button, Editor } from '../../components'
import AddDelay from './AddDelay'
import Info from './Info'

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
      <div className="new-question__header">
        <h3>
          Create a new question 
          <Info>
            Here you can <strong>create</strong> new questions <br/>& their answers.
          </Info>
        </h3>
      </div>
      <Editor menuId="new-question" content={content?.question} onChange={setContent} canEdit={!isLoading} />
      <p>{error}</p>
      <div className="new-question__actions">
        <AddDelay />
        <Button
          variant="primary"
          disabled={!canSubmit || isLoading}
          title={isLoading ? 'Saving…' : 'Add a question then submit.'}
          onClick={handleSubmit}
        >Create question</Button>
      </div>
    </div>
  )
}

export default NewQuestion
