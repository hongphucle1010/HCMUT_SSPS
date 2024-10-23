import { useDispatch } from 'react-redux'
import './App.css'
import Router from './routes'
import React from 'react'
import { initStatus } from './utils/authentication/authentication'

const App: React.FC = () => {
  const dispatch = useDispatch()
  React.useEffect(() => {
    initStatus(dispatch)
  }, [dispatch])
  return <Router />
}

export default App
