import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Marketplace from "./pages/Marketplace";
import CarbonCal from "./components/calculator/CarbonCal";
import About from "./components/About";
// import Dashboard from "./pages/Dashboard";
// import Governmentportal from "./pages/Governmentportal";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const connectWallet = () => {
    setIsWalletConnected(true);
    setWalletAddress("0x71C7656EC7ab88b098defB751B7401B5f6d8976F");
  };

  const disconnectWallet = () => {
    setIsWalletConnected(false);
    setWalletAddress("");
  };

  // useEffect(() => {
  //   localStorage.setItem("isLoggedIn", isLoggedIn);
  // }, [isLoggedIn]);

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Navbar
          isWalletConnected={isWalletConnected}
          walletAddress={walletAddress}
          connectWallet={connectWallet}
          disconnectWallet={disconnectWallet}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
        />
        <main className="flex-grow">
          <Routes>
            {/* Public Routes */}
            {!isLoggedIn && (
              <>
                <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="*" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
              </>
            )}

            {/* Protected Routes */}
            {isLoggedIn && (
              <>
                <Route
                  path="/"
                  element={
                    <ProtectedRoute isLoggedIn={isLoggedIn}>
                      <Home connectWallet={connectWallet} />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/marketplace"
                  element={
                    <ProtectedRoute isLoggedIn={isLoggedIn}>
                      <Marketplace isWalletConnected={isWalletConnected} />
                    </ProtectedRoute>
                  }
                />
                {/* <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute isLoggedIn={isLoggedIn}>
                      <Dashboard  isWalletConnected={isWalletConnected} />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/govenmentportal"
                  element={
                    <ProtectedRoute isLoggedIn={isLoggedIn}>
                      <Governmentportal isWalletConnected={isWalletConnected} />
                    </ProtectedRoute>
                  }
                /> */}
                <Route
                  path="/carboncal"
                  element={
                    <ProtectedRoute isLoggedIn={isLoggedIn}>
                      <CarbonCal isWalletConnected={isWalletConnected} />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/about"
                  element={
                    <ProtectedRoute isLoggedIn={isLoggedIn}>
                      <About />
                    </ProtectedRoute>
                  }
                />
              </>
            )}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
