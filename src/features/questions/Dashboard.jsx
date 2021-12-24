import Questions from './Questions'
import NewQuestion from './NewQuestion'
import Footer from './Footer'

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
        <Footer />
      </div>
    </div>
  )
}

export default Dashboard
