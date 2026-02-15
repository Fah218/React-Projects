import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';
import { FiHome, FiPlus, FiCalendar, FiBook, FiLogOut, FiLogIn, FiUserPlus } from 'react-icons/fi';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  };

  const isActive = (path) => {
    if (path === location.pathname) return true;
    return false;
  };

  const navLinks = [
    { path: '/', label: 'Home', icon: FiHome },
    { path: '/add-recipe', label: 'Add Recipe', icon: FiPlus },
    { path: '/planner', label: 'Planner', icon: FiCalendar },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-600 to-red-600 rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
              <FiBook className="text-white" size={22} />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              RecipeBook
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${isActive(link.path)
                      ? 'bg-orange-600 text-white shadow-md'
                      : 'text-gray-700 hover:bg-gray-100'
                    }`}
                >
                  <Icon size={20} />
                  <span className="hidden md:inline">{link.label}</span>
                </Link>
              );
            })}

            {user ? (
              <button
                onClick={onLogout}
                className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-gray-700 hover:bg-gray-100 transition-all ml-2"
              >
                <FiLogOut size={20} />
                <span className="hidden md:inline">Logout</span>
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ml-2 ${isActive('/login') ? 'bg-orange-600 text-white shadow-md' : 'text-gray-700 hover:bg-gray-100'
                    }`}
                >
                  <FiLogIn size={20} />
                  <span className="hidden md:inline">Login</span>
                </Link>
                <Link
                  to="/register"
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${isActive('/register') ? 'bg-orange-600 text-white shadow-md' : 'text-gray-700 hover:bg-gray-100'
                    }`}
                >
                  <FiUserPlus size={20} />
                  <span className="hidden md:inline">Register</span>
                </Link>
              </>
            )}

          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;