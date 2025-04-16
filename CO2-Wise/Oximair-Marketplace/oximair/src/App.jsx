"use client"

import { useState } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import Marketplace from "./pages/Marketplace"
// import SellTokens from "./pages/SellTokens"
// import Portfolio from "./pages/Portfolio"
// import GovernmentPortal from "./pages/GovernmentPortal"
// import About from "./pages/About"
// import Analytics from "./pages/Analytics"
// import News from "./pages/News"

function App() {
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")

  const connectWallet = () => {
    // Simulate wallet connection
    setIsWalletConnected(true)
    setWalletAddress("0x71C7656EC7ab88b098defB751B7401B5f6d8976F")
  }

  const disconnectWallet = () => {
    setIsWalletConnected(false)
    setWalletAddress("")
  }

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Navbar 
          isWalletConnected={isWalletConnected} 
          walletAddress={walletAddress}
          connectWallet={connectWallet} 
          disconnectWallet={disconnectWallet}
        />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home connectWallet={connectWallet} />} />
            <Route path="/marketplace" element={<Marketplace isWalletConnected={isWalletConnected} />} />
            {/* <Route path="/sell" element={<SellTokens isWalletConnected={isWalletConnected} />} />
            <Route path="/portfolio" element={<Portfolio isWalletConnected={isWalletConnected} />} />
            <Route path="/government" element={<GovernmentPortal />} /> */}
            {/* <Route path="/about" element={<About />} /> */}
            {/* <Route path="/analytics" element={<Analytics isWalletConnected={isWalletConnected} />} /> */}
            {/* <Route path="/news" element={<News />} /> */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
