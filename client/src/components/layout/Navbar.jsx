import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaSignInAlt, FaUserPlus, FaUserCircle, FaSignOutAlt, FaPen, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { logoutUser } from '../../redux/actions/authActions';
import logo from '../../assets/logo.png';

// Spinner component to display loading animation
const Spinner = () => (
  <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
    <FaSpinner className="animate-spin text-6xl text-blue-500" />
  </div>
);

// Navbar component
const Navbar = () => {
  // State variables
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Redux state and dispatch
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  // React Router hook for navigation
  const navigate = useNavigate();

  // Logout handler
  const handleLogout = () => {
    setShowLogoutModal(false);
    setIsLoading(true);

    // Simulate delay before logging out
    setTimeout(() => {
      dispatch(logoutUser());
      setIsLoading(false);
      navigate('/');
    }, 2000);
  };

  // Logout Modal component
  const LogoutModal = () => (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-40">
      <div className="bg-white p-4 rounded shadow-lg">
        <h2 className="text-xl mb-4">Are you sure you want to log out?</h2>
        <div className="flex justify-center">
          <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded mr-2">Yes</button>
          <button onClick={() => setShowLogoutModal(false)} className="bg-gray-300 px-4 py-2 rounded">Cancel</button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {isLoading && <Spinner />} {/* Display spinner while loading */}
      <nav className="bg-gray-800 text-white flex items-center justify-between py-2" style={{ paddingLeft: '5%', paddingRight: '5%' }}>
        <div className="flex items-center">
          <img src={logo} alt="IntelliForum Logo" className="h-8 mr-2 rounded-full" />
          <span className="font-bold text-xl">IntelliForum</span>
        </div>

        <ul className="flex items-center">
          {/* Home link */}
          <li className="mx-2">
            <Link to="/" className="flex items-center">
              <FaHome className="mr-1 text-green-500" /> Home
            </Link>
          </li>

          {/* Conditional rendering based on authentication status */}
          {isAuthenticated ? (
            <>
              {/* Create Question link */}
              <li className="mx-2">
                <Link to="/create-question" className="flex items-center">
                  <FaPen className="mr-1 text-yellow-500" /> Create Question
                </Link>
              </li>

              {/* Profile link */}
              <li className="mx-2">
                <Link to="/profile" className="flex items-center">
                  <FaUserCircle className="mr-1 text-purple-500" /> Profile
                </Link>
              </li>

              {/* Logout button */}
              <li className="mx-2">
                <button onClick={() => setShowLogoutModal(true)} className="flex items-center text-white">
                  <FaSignOutAlt className="mr-1 text-red-500" /> Logout
                </button>
              </li>
            </>
          ) : (
            <>
              {/* Login link */}
              <li className="mx-2">
                <Link to="/login" className="flex items-center">
                  <FaSignInAlt className="mr-1 text-blue-500" /> Login
                </Link>
              </li>

              {/* Register link */}
              <li className="mx-2">
                <Link to="/register" className="flex items-center">
                  <FaUserPlus className="mr-1 text-orange-500" /> Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>

      {/* Display LogoutModal when showLogoutModal state is true */}
      {showLogoutModal && <LogoutModal />}
    </>
  );
};

export default Navbar;
