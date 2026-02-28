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
    <header className='h-[72px] flex items-center shadow-lg bg-black/80 backdrop-blur-md border-b border-red-900/30 sticky top-0 z-50 transition-all'>
      <Container>
        <nav className='flex items-center justify-between w-full'>
          {/* Brand Section - Left Side */}
          <div className='flex items-center'>
            <Link to='/' className='flex items-center group'>
              <span className='text-3xl font-extrabold bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent transform transition-transform hover:scale-105 duration-300'>
                BlogSpace
              </span>
            </Link>
          </div>

          {/* Navigation Items - Pin to the far Right */}
          <div className='flex items-center ml-auto'>
            <ul className='flex items-center gap-2 md:gap-4'>
              {navItems.map((item) =>
                item.active ? (
                  <li key={item.name}>
                    <button
                      onClick={() => navigate(item.slug)}
                      className='px-3 md:px-5 py-2 md:py-2.5 text-sm md:text-base duration-300 hover:bg-red-600 bg-gray-800/70 hover:shadow-[0_0_15px_rgba(220,38,38,0.5)] rounded-xl text-white font-semibold transition-all hover:-translate-y-1 hover:scale-105 border border-gray-700/50 hover:border-red-500 whitespace-nowrap'
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