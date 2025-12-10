import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import authService from "./appwrite/auth"
import {login, logout} from "./store/authSlice"
import { Footer, Header } from './components'
import { Outlet } from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({userData}))
        } else {
          dispatch(logout())
        }
      })
      .finally(() => setLoading(false))
  }, [dispatch])

  return !loading ? (
    <div className="deeni-app">
      <Header />
      <main className="deeni-main">
        <Outlet />
      </main>
      <Footer />
    </div>
  ) : (
    <div className="deeni-loader">
      <div className="loader-circle"></div>
      <p className="loader-text">Loading DeeniHub...</p>
    </div>
  )
}

export default App