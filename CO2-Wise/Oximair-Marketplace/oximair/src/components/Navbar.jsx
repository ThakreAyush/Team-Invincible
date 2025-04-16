"use client"

import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { Menu, X, Leaf, ChevronDown, LogOut, Copy, ExternalLink } from 'lucide-react'

const Navbar = ({ isWalletConnected, walletAddress, connectWallet, disconnectWallet }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isWalletDropdownOpen, setIsWalletDropdownOpen] = useState(false)
  const [isCopied, setIsCopied] = useState(false)
  const location = useLocation()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const toggleWalletDropdown = () => {
    setIsWalletDropdownOpen(!isWalletDropdownOpen)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(walletAddress)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isWalletDropdownOpen && !event.target.closest('.wallet-dropdown')) {
        setIsWalletDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isWalletDropdownOpen])

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false)
  }, [location])

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Marketplace", path: "/marketplace" },
    { name: "Sell Tokens", path: "/sell" },
    { name: "My Portfolio", path: "/portfolio" },
    { name: "Analytics", path: "/analytics" },
    { name: "News", path: "/news" },
    { name: "Government Portal", path: "/government" },
    { name: "About", path: "/about" },
  ]

  const truncateAddress = (address) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

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
                      ? "text-green-600 bg-green-50"
                      : "text-gray-600 hover:text-green-600 hover:bg-green-50"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
            
            {isWalletConnected ? (
              <div className="relative wallet-dropdown">
                <button
                  onClick={toggleWalletDropdown}
                  className="ml-4 px-4 py-2 rounded-md text-sm font-medium bg-green-100 text-green-800 border border-green-600 flex items-center"
                >
                  {truncateAddress(walletAddress)}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </button>
                
                {isWalletDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-60 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
                    <div className="px-4 py-2 border-b border-gray-200">
                      <p className="text-sm text-gray-500">Connected Wallet</p>
                      <div className="flex items-center justify-between mt-1">
                        <p className="text-sm font-medium text-gray-800">{truncateAddress(walletAddress)}</p>
                        <button 
                          onClick={copyToClipboard}
                          className="text-gray-400 hover:text-gray-600"
                          title="Copy address"
                        >
                          {isCopied ? (
                            <span className="text-green-600 text-xs">Copied!</span>
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </div>
                    <a 
                      href={`https://etherscan.io/address/${walletAddress}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View on Etherscan
                    </a>
                    <button 
                      onClick={disconnectWallet}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Disconnect Wallet
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={connectWallet}
                className="ml-4 px-4 py-2 rounded-md text-sm font-medium bg-green-600 text-white hover:bg-green-700"
              >
                Connect Wallet
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            {isWalletConnected ? (
              <button
                onClick={toggleWalletDropdown}
                className="mr-2 px-3 py-1 rounded-md text-sm font-medium bg-green-100 text-green-800 border border-green-600 flex items-center"
              >
                {truncateAddress(walletAddress)}
                <ChevronDown className="ml-1 h-3 w-3" />
              </button>
            ) : (
              <button
                onClick={connectWallet}
                className="mr-2 px-3 py-1 rounded-md text-sm font-medium bg-green-600 text-white hover:bg-green-700"
              >
                Connect
              </button>
            )}
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
                    ? "text-green-600 bg-green-50"
                    : "text-gray-600 hover:text-green-600 hover:bg-green-50"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Mobile wallet dropdown */}
      {isWalletConnected && isWalletDropdownOpen && (
        <div className="md:hidden px-4 py-2 border-t border-gray-200">
          <div className="flex items-center justify-between py-2">
            <p className="text-sm font-medium text-gray-800">{truncateAddress(walletAddress)}</p>
            <button 
              onClick={copyToClipboard}
              className="text-gray-400 hover:text-gray-600"
            >
              {isCopied ? (
                <span className="text-green-600 text-xs">Copied!</span>
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </button>
          </div>
          <div className="flex space-x-2 pt-2 border-t border-gray-200">
            <a 
              href={`https://etherscan.io/address/${walletAddress}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex-1 text-center px-2 py-1 text-xs text-gray-700 bg-gray-100 rounded"
            >
              View on Etherscan
            </a>
            <button 
              onClick={disconnectWallet}
              className="flex-1 text-center px-2 py-1 text-xs text-red-600 bg-red-50 rounded"
            >
              Disconnect
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
