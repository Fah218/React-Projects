import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'

function LogoutBtn() {
  const dispatch = useDispatch()
  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout())
    })
  }
  return (
    <button
      className='px-4 py-2 text-sm duration-300 hover:bg-red-600 bg-gray-800/50 hover:shadow-lg hover:shadow-red-600/30 rounded-lg text-white font-medium transition-all hover:scale-105 border border-gray-700 hover:border-red-600 whitespace-nowrap'
      onClick={logoutHandler}
    >Logout</button>
  )
}

export default LogoutBtn