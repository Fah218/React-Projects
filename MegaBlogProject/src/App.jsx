import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import authService from "./appwrite/auth"
import { login, logout, authChecked } from "./store/authSlice"
import { Footer, Header } from './components'
import { Outlet } from 'react-router-dom'

function App() {

  const dispatch = useDispatch()

  useEffect(() => {
  setTimeout(() => {
    authService.getCurrentUser()
      .then(userData => {
        if (userData) {
          dispatch(login({ userData }))
        } else {
          dispatch(authChecked())
        }
      })
      .catch(() => dispatch(authChecked()))
  }, 300)
}, [dispatch])


  return (
    <div className='min-h-screen flex flex-wrap content-between bg-gradient-to-br from-black via-gray-900 to-black'>
      <div className='w-full block'>
        <Header />
        <main className='animate-fadeIn'>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default App
