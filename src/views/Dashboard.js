import { Questions, NewQuestion } from '../layouts'
const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="dashboard__header">
        <p>FAQ</p>
        <Questions />
      </div>
      <div className="dashboard__main">
        <NewQuestion />
      </div>
      <div className="dashboard__footer">
        <button>Cancel</button>
        <button>Delete</button>
      </div>
    </div>
  )
}

export default Dashboard
