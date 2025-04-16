import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Marketplace from './pages/Marketplace'
import SellTokens from './pages/SellTokens'
import Portfolio from './pages/Portfolio'
import GovernmentPortal from './pages/GovernmentPortal'
import About from './pages/About'

function App() {
  const [isWalletConnected, setIsWalletConnected] = useState(false)

  const connectWallet = () => {
    setIsWalletConnected(true)
  }

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Navbar isWalletConnected={isWalletConnected} connectWallet={connectWallet} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home connectWallet={connectWallet} />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/sell" element={<SellTokens />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/government" element={<GovernmentPortal />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
