import Logo from './Logo'
import Footer from './Footer'
import NewQuestion from './NewQuestion'
import Questions from './Questions'

const Dashboard = () => {
  return (
    <>
      <div className="dashboard">
        <div className="dashboard__header">
          <Logo />
          <Questions />
        </div>
        <div className="dashboard__main">
          <NewQuestion />
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Dashboard
