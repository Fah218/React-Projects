import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

export default function Protected({ children, authentication = true }) {

  const navigate = useNavigate()
  const [loader, setLoader] = useState(true)

  const authStatus = useSelector(state => state.auth.status)
  const authLoaded = useSelector(state => state.auth.loaded) // 👈 important

  useEffect(() => {

    if (!authLoaded) return   // wait until session check finishes

    if (authentication && !authStatus) {
      navigate("/login")
    } 
    else if (!authentication && authStatus) {
      navigate("/")
    }

    setLoader(false)

  }, [authStatus, authLoaded, authentication, navigate])

  if (!authLoaded || loader) return <h1>Loading...</h1>

  return <>{children}</>
}
