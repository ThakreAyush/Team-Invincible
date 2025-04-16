import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Leaf } from 'lucide-react'

const Navbar = ({ isWalletConnected, connectWallet }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Marketplace', path: '/marketplace' },
    { name: 'Sell Tokens', path: '/sell' },
    { name: 'My Portfolio', path: '/portfolio' },
    { name: 'Government Portal', path: '/government' },
    { name: 'About', path: '/about' },
  ]

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Leaf className="h-8 w-8 text-green-600" />
              <span className="ml-2 text-xl font-bold text-gray-800">CarbonChain</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex space-x-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    location.pathname === link.path
                      ? 'text-green-600 bg-green-50'
                      : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <button
              onClick={connectWallet}
              className={`ml-4 px-4 py-2 rounded-md text-sm font-medium ${
                isWalletConnected
                  ? 'bg-green-100 text-green-800 border border-green-600'
                  : 'bg-green-600 text-white hover:bg-green-700'
              }`}
            >
              {isWalletConnected ? 'Wallet Connected' : 'Connect Wallet'}
            </button>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={connectWallet}
              className={`mr-2 px-3 py-1 rounded-md text-sm font-medium ${
                isWalletConnected
                  ? 'bg-green-100 text-green-800 border border-green-600'
                  : 'bg-green-600 text-white hover:bg-green-700'
              }`}
            >
              {isWalletConnected ? 'Connected' : 'Connect'}
            </button>
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-green-600 hover:bg-green-50 focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === link.path
                    ? 'text-green-600 bg-green-50'
                    : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
