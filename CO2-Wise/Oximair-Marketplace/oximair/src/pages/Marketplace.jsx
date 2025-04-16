"use client"

import { useState, useEffect } from "react"
import { ethers } from "ethers"
import {
  Search, Filter, ChevronDown, ChevronUp,
  Grid, List, SlidersHorizontal, ArrowUpDown, Info
} from 'lucide-react'
import TokenCard from "../components/TokenCard"
import Button from "../components/Button"
import TokenDetailModal from "../components/TokenDetailModal"
import { tokens } from "../mockData"

const Marketplace = () => {
  const [filteredTokens, setFilteredTokens] = useState(tokens)
  const [searchTerm, setSearchTerm] = useState("")
  const [filters, setFilters] = useState({
    region: "",
    type: "",
    priceRange: "",
    rating: "",
    vintage: "",
    standard: "",
  })
  const [showFilters, setShowFilters] = useState(false)
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [tokensPerPage, setTokensPerPage] = useState(9)
  const [viewType, setViewType] = useState("grid")
  const [sortOption, setSortOption] = useState("default")
  const [selectedToken, setSelectedToken] = useState(null)

  const [walletAddress, setWalletAddress] = useState("")

  // Wallet functions
  useEffect(() => {
    const checkWallet = async () => {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: "eth_accounts" });
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
        }
      }
    }
    checkWallet()
  }, [])

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        setWalletAddress(accounts[0]);
      } catch (err) {
        console.error("User rejected connection", err);
      }
    } else {
      alert("Please install MetaMask!");
    }
  }

  // Filtering logic
  useEffect(() => {
    let results = tokens
    if (searchTerm) {
      results = results.filter(
        (token) =>
          token.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          token.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          token.region.toLowerCase().includes(searchTerm.toLowerCase()) ||
          token.type.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    if (filters.region) results = results.filter((token) => token.region === filters.region)
    if (filters.type) results = results.filter((token) => token.type === filters.type)
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split("-").map(Number)
      results = results.filter((token) => token.tokenPrice >= min && (!max || token.tokenPrice <= max))
    }
    if (filters.rating) {
      const minRating = Number(filters.rating)
      results = results.filter((token) => token.rating >= minRating)
    }
    if (filters.vintage) results = results.filter((token) => token.vintage === filters.vintage)
    if (filters.standard) results = results.filter((token) => token.standard === filters.standard)

    switch (sortOption) {
      case "price-low":
        results = [...results].sort((a, b) => a.tokenPrice - b.tokenPrice)
        break
      case "price-high":
        results = [...results].sort((a, b) => b.tokenPrice - a.tokenPrice)
        break
      case "newest":
        results = [...results].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        break
      case "oldest":
        results = [...results].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
        break
      case "rating":
        results = [...results].sort((a, b) => b.rating - a.rating)
        break
    }

    setFilteredTokens(results)
    setCurrentPage(1)
  }, [searchTerm, filters, sortOption])

  const regions = [...new Set(tokens.map((token) => token.region))]
  const types = [...new Set(tokens.map((token) => token.type))]
  const vintages = [...new Set(tokens.map((token) => token.vintage).filter(Boolean))]
  const standards = [...new Set(tokens.map((token) => token.standard).filter(Boolean))]

  const indexOfLastToken = currentPage * tokensPerPage
  const indexOfFirstToken = indexOfLastToken - tokensPerPage
  const currentTokens = filteredTokens.slice(indexOfFirstToken, indexOfLastToken)
  const totalPages = Math.ceil(filteredTokens.length / tokensPerPage)

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters((prev) => ({ ...prev, [name]: value }))
  }

  const clearFilters = () => {
    setFilters({
      region: "",
      type: "",
      priceRange: "",
      rating: "",
      vintage: "",
      standard: "",
    })
    setSearchTerm("")
    setSortOption("default")
  }

  const handleViewToken = (token) => {
    setSelectedToken(token)
  }

  const closeModal = () => {
    setSelectedToken(null)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Wallet Button */}
      <div className="flex justify-end mb-4">
        {walletAddress ? (
          <div className="text-sm text-green-700 font-semibold bg-green-100 px-4 py-2 rounded-md">
            ✅ Connected: {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
          </div>
        ) : (
          <button
            onClick={connectWallet}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
          >
            Connect Wallet
          </button>
        )}
      </div>

      {/* Heading */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Carbon Credit Marketplace</h1>
        <p className="mt-2 text-gray-600">
          Browse and purchase verified carbon credit tokens from projects around the world.
        </p>
      </div>

      {/* ... Keep the rest of your Marketplace content unchanged ... */}

      {/* Token Cards */}
      {currentTokens.length > 0 ? (
        <div className={`grid ${viewType === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'} mb-8`}>
          {currentTokens.map((token) => (
            <TokenCard
              key={token.id}
              token={token}
              onViewDetails={() => handleViewToken(token)}
              isWalletConnected={!!walletAddress}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <p className="text-gray-600 mb-4">No carbon credit tokens match your search criteria.</p>
          <Button variant="primary" onClick={clearFilters}>
            Clear Filters
          </Button>
        </div>
      )}

      {/* Token Modal */}
      {selectedToken && (
        <TokenDetailModal
          token={selectedToken}
          onClose={closeModal}
          isWalletConnected={!!walletAddress}
        />
      )}
    </div>
  )
}

export default Marketplace
