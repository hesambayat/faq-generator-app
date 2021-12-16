const NewQuestion = () => {
  return (
    <div className="new-question">
      <h1>Create a new question</h1>
      <form method="get">
        <div className="form-group">
          <label htmlFor="question">Question</label>
          <input type="text" className="form-control" name="question" id="question" placeholder="E.g. Do car tires get tired?" />
        </div>
        <div className="form-group">
          <label htmlFor="answer">Answer</label>
          <textarea className="form-control" name="answer" id="answer" placeholder="Of course they do…" />
        </div>
        <input type="checkbox" name="mock" id="mock" value="5000" />
        <label htmlFor="mock">Add five seconds delay</label>
        <button type="submit">Create question</button>
      </form>
    </div>
  )
}

export default NewQuestion
