import { Leaf, Mail, Phone, MapPin, Twitter, Facebook, Linkedin } from 'lucide-react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center">
              <Leaf className="h-8 w-8 text-green-400" />
              <span className="ml-2 text-xl font-bold">CarbonChain</span>
            </div>
            <p className="mt-4 text-gray-300">
              Empowering a sustainable future through blockchain-based carbon credit trading.
            </p>
            <div className="flex mt-6 space-x-4">
              <a href="#" className="text-gray-300 hover:text-green-400">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-green-400">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-green-400">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-green-400">Home</Link></li>
              <li><Link to="/marketplace" className="text-gray-300 hover:text-green-400">Marketplace</Link></li>
              <li><Link to="/sell" className="text-gray-300 hover:text-green-400">Sell Tokens</Link></li>
              <li><Link to="/portfolio" className="text-gray-300 hover:text-green-400">My Portfolio</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-300 hover:text-green-400">About Us</Link></li>
              <li><a href="#" className="text-gray-300 hover:text-green-400">Blog</a></li>
              <li><a href="#" className="text-gray-300 hover:text-green-400">Documentation</a></li>
              <li><a href="#" className="text-gray-300 hover:text-green-400">Partners</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-green-400" />
                <span className="text-gray-300">info@carbonchain.com</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-green-400" />
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 text-green-400 mt-1" />
                <span className="text-gray-300">123 Green Street, Eco City, Planet Earth</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300 text-sm">
            &copy; {new Date().getFullYear()} CarbonChain. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <a href="#" className="text-gray-300 hover:text-green-400 text-sm">Privacy Policy</a>
            <a href="#" className="text-gray-300 hover:text-green-400 text-sm">Terms of Service</a>
            <a href="#" className="text-gray-300 hover:text-green-400 text-sm">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
