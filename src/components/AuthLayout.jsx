import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import "./AuthLayout.css"

export default function Protected({ children, authentication = true }) {

  const navigate = useNavigate()
  const [loader, setLoader] = useState(true)
  const authStatus = useSelector(state => state.auth.status)

  useEffect(() => {

    if (authentication && authStatus !== true) {
      navigate("/login")
    } 
    else if (!authentication && authStatus === true) {
      navigate("/")
    }

    setLoader(false)
  }, [authStatus, navigate, authentication])

  return loader ? (
    <div className="protected-loader">
      <div className="loader-circle"></div>
      <p className="loader-text">Loading...</p>
    </div>
  ) : (
    <>{children}</>
  )
}