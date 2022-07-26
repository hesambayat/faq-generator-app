import { useEffect, useMemo, useState } from 'react'
import { Shader } from '../../components'
import Logo from './Logo'
import Footer from './Footer'
import NewQuestion from './NewQuestion'
import Questions from './Questions'

const MINIMUM_SPLASH_SCREEN_PERIOD = 1000

const Dashboard = () => {
  const [areFontsReady, setFontsReady] = useState(false)
  const [minSplashScreenPeriod, setOffSplashScreen] = useState(true)
  const isLoading = useMemo(() => !areFontsReady || minSplashScreenPeriod, [areFontsReady, minSplashScreenPeriod])
  const classNames = useMemo(() => {
    return `dashboard dashboard--${isLoading ? 'loading' : 'ready'}`
  }, [isLoading])

  useEffect(() => {
    document.fonts.ready.then(() => setFontsReady(true))
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => setOffSplashScreen(false), MINIMUM_SPLASH_SCREEN_PERIOD)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <Shader />
      <div className={classNames}>
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
