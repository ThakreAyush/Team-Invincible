"use client";

import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Marketplace from "./pages/Marketplace";
import CarbonCal from "./components/calculator/CarbonCal";
import About from "./components/About";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
function App() {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");

  const connectWallet = () => {
    // Simulate wallet connection
    setIsWalletConnected(true);
    setWalletAddress("0x71C7656EC7ab88b098defB751B7401B5f6d8976F");
  };

  const disconnectWallet = () => {
    setIsWalletConnected(false);
    setWalletAddress("");
  };
  const [isLogin, setIsLogin] = useState(false);

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
          {isLogin ? (
            <Routes>
              <Route
                path="/"
                element={<Home connectWallet={connectWallet} />}
              />
              <Route
                path="/marketplace"
                element={<Marketplace isWalletConnected={isWalletConnected} />}
              />
              <Route
                path="/CarbonCal"
                element={<CarbonCal isWalletConnected={isWalletConnected} />}
              />

              <Route path="/about" element={<About />} />
            </Routes>
          ) : (
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/sign-up" element={<SignUp />} />
            </Routes>
          )}
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
