import React from 'react'
import { Container, LogoutBtn } from '../index'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()

  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ]

  return (
    <header className='py-3 shadow-lg bg-black/80 backdrop-blur-md border-b border-red-900/30 sticky top-0 z-50'>
      <Container>
        <nav className='flex items-center justify-between'>
          {/* Brand Section - Left Side */}
          <div className='flex items-center'>
            <Link to='/' className='flex items-center group'>
              <span className='text-2xl font-bold bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent'>
                BlogSpace
              </span>
            </Link>
          </div>

          {/* Navigation Items - Top Right */}
          <div className='flex items-center'>
            <ul className='flex items-center gap-3'>
              {navItems.map((item) =>
                item.active ? (
                  <li key={item.name}>
                    <button
                      onClick={() => navigate(item.slug)}
                      className='px-4 py-2 text-sm duration-300 hover:bg-red-600 bg-gray-800/50 hover:shadow-lg hover:shadow-red-600/30 rounded-lg text-white font-medium transition-all hover:scale-105 border border-gray-700 hover:border-red-600 whitespace-nowrap'
                    >{item.name}</button>
                  </li>
                ) : null
              )}
              {authStatus && (
                <li>
                  <LogoutBtn />
                </li>
              )}
            </ul>
          </div>
        </nav>
      </Container>
    </header>
  )
}

export default Header