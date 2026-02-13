import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import authService from "./appwrite/auth"
import { login, logout, authChecked } from "./store/authSlice";
import { Footer, Header } from './components'
import { Outlet } from 'react-router-dom'

function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
      .then(userData => {
        if (userData) {
          dispatch(login({ userData }))
        } else {
          dispatch(authChecked())
        }
      })
      .catch(() => dispatch(authChecked()))
  }, [dispatch])




  return (
    <div className='min-h-screen flex flex-col bg-gradient-to-br from-black via-gray-900 to-black'>
      <Header />
      <main className='flex-1 animate-fadeIn'>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default App
