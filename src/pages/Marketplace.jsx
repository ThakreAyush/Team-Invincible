"use client"

import { useState, useEffect } from "react"
import { Search, Filter, ChevronDown, ChevronUp, Grid, List, SlidersHorizontal, ArrowUpDown, Info } from 'lucide-react'
import TokenCard from "../components/TokenCard"
import Button from "../components/Button"
import TokenDetailModal from "../components/TokenDetailModal"
import { tokens } from "../mockData"

const Marketplace = ({ isWalletConnected }) => {
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
  const [viewType, setViewType] = useState("grid") // grid or list
  const [sortOption, setSortOption] = useState("default")
  const [selectedToken, setSelectedToken] = useState(null)

  // Filter tokens based on search and filters
  useEffect(() => {
    let results = tokens

    // Search filter
    if (searchTerm) {
      results = results.filter(
        (token) =>
          token.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          token.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          token.region.toLowerCase().includes(searchTerm.toLowerCase()) ||
          token.type.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Region filter
    if (filters.region) {
      results = results.filter((token) => token.region === filters.region)
    }

    // Type filter
    if (filters.type) {
      results = results.filter((token) => token.type === filters.type)
    }

    // Price range filter
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split("-").map(Number)
      results = results.filter((token) => token.tokenPrice >= min && (max ? token.tokenPrice <= max : true))
    }

    // Rating filter
    if (filters.rating) {
      const minRating = Number(filters.rating)
      results = results.filter((token) => token.rating >= minRating)
    }

    // Vintage filter
    if (filters.vintage) {
      results = results.filter((token) => token.vintage === filters.vintage)
    }

    // Standard filter
    if (filters.standard) {
      results = results.filter((token) => token.standard === filters.standard)
    }

    // Sort results
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
      default:
        // Default sorting (by ID)
        break
    }

    setFilteredTokens(results)
    setCurrentPage(1) // Reset to first page when filters change
  }, [searchTerm, filters, sortOption])

  // Get unique values for filter options
  const regions = [...new Set(tokens.map((token) => token.region))]
  const types = [...new Set(tokens.map((token) => token.type))]
  const vintages = [...new Set(tokens.map((token) => token.vintage).filter(Boolean))]
  const standards = [...new Set(tokens.map((token) => token.standard).filter(Boolean))]

  // Calculate pagination
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
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Carbon Credit Marketplace</h1>
        <p className="mt-2 text-gray-600">
          Browse and purchase verified carbon credit tokens from projects around the world.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by company, description, region..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" className="md:w-auto" onClick={() => setShowFilters(!showFilters)}>
              <Filter className="h-5 w-5 mr-2" />
              Filters
              {showFilters ? <ChevronUp className="h-5 w-5 ml-2" /> : <ChevronDown className="h-5 w-5 ml-2" />}
            </Button>
            <div className="hidden md:flex gap-2">
              <Button
                variant={viewType === "grid" ? "primary" : "secondary"}
                size="sm"
                onClick={() => setViewType("grid")}
                className="px-3"
              >
                <Grid className="h-5 w-5" />
              </Button>
              <Button
                variant={viewType === "list" ? "primary" : "secondary"}
                size="sm"
                onClick={() => setViewType("list")}
                className="px-3"
              >
                <List className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {showFilters && (
          <div className="bg-white p-4 rounded-md shadow-md mb-4 border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label htmlFor="region" className="block text-sm font-medium text-gray-700 mb-1">
                  Region
                </label>
                <select
                  id="region"
                  name="region"
                  value={filters.region}
                  onChange={handleFilterChange}
                  className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">All Regions</option>
                  {regions.map((region) => (
                    <option key={region} value={region}>
                      {region}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                  Project Type
                </label>
                <select
                  id="type"
                  name="type"
                  value={filters.type}
                  onChange={handleFilterChange}
                  className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">All Types</option>
                  {types.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="priceRange" className="block text-sm font-medium text-gray-700 mb-1">
                  Price Range
                </label>
                <select
                  id="priceRange"
                  name="priceRange"
                  value={filters.priceRange}
                  onChange={handleFilterChange}
                  className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">Any Price</option>
                  <option value="0-20">$0 - $20</option>
                  <option value="20-30">$20 - $30</option>
                  <option value="30-40">$30 - $40</option>
                  <option value="40-1000">$40+</option>
                </select>
              </div>
            </div>

            <div className="mb-4">
              <button
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                className="flex items-center text-sm text-green-600 hover:text-green-800"
              >
                <SlidersHorizontal className="h-4 w-4 mr-1" />
                {showAdvancedFilters ? "Hide Advanced Filters" : "Show Advanced Filters"}
                {showAdvancedFilters ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />}
              </button>
            </div>

            {showAdvancedFilters && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 pt-2 border-t border-gray-200">
                <div>
                  <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-1">
                    Minimum Rating
                  </label>
                  <select
                    id="rating"
                    name="rating"
                    value={filters.rating}
                    onChange={handleFilterChange}
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">Any Rating</option>
                    <option value="4">4+ Stars</option>
                    <option value="3">3+ Stars</option>
                    <option value="2">2+ Stars</option>
                    <option value="1">1+ Stars</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="vintage" className="block text-sm font-medium text-gray-700 mb-1">
                    Vintage Year
                  </label>
                  <select
                    id="vintage"
                    name="vintage"
                    value={filters.vintage}
                    onChange={handleFilterChange}
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">Any Year</option>
                    {vintages.map((vintage) => (
                      <option key={vintage} value={vintage}>
                        {vintage}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="standard" className="block text-sm font-medium text-gray-700 mb-1">
                    Verification Standard
                  </label>
                  <select
                    id="standard"
                    name="standard"
                    value={filters.standard}
                    onChange={handleFilterChange}
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">Any Standard</option>
                    {standards.map((standard) => (
                      <option key={standard} value={standard}>
                        {standard}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <label htmlFor="sortOption" className="block text-sm font-medium text-gray-700 mr-2">
                  Sort By:
                </label>
                <select
                  id="sortOption"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="default">Default</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                Clear Filters
              </Button>
            </div>
          </div>
        )}

        {/* Results summary */}
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-600">
            Showing {filteredTokens.length} {filteredTokens.length === 1 ? "result" : "results"}
            {(searchTerm || Object.values(filters).some(val => val !== "")) && " with applied filters"}
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="perPage" className="text-sm text-gray-600">Show:</label>
            <select
              id="perPage"
              value={tokensPerPage}
              onChange={(e) => setTokensPerPage(Number(e.target.value))}
              className="border border-gray-300 rounded-md p-1 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value={6}>6</option>
              <option value={9}>9</option>
              <option value={12}>12</option>
              <option value={24}>24</option>
            </select>
          </div>
        </div>
      </div>

      {/* Token Grid/List */}
      {filteredTokens.length > 0 ? (
        <>
          {viewType === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {currentTokens.map((token) => (
                <TokenCard 
                  key={token.id} 
                  token={token} 
                  onViewDetails={() => handleViewToken(token)}
                  isWalletConnected={isWalletConnected}
                />
              ))}
            </div>
          ) : (
            <div className="space-y-4 mb-8">
              {currentTokens.map((token) => (
                <div key={token.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300">
                  <div className="p-4 flex flex-col md:flex-row gap-4">
                    <div className="md:w-1/4">
                      <div className="bg-green-100 p-4 rounded-lg flex items-center justify-center h-full">
                        <div className="text-center">
                          <Leaf className="h-12 w-12 text-green-600 mx-auto" />
                          <h3 className="mt-2 text-lg font-semibold text-gray-800">{token.companyName}</h3>
                        </div>
                      </div>
                    </div>
                    <div className="md:w-2/4">
                      <div className="mb-2">
                        <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mr-2">
                          {token.type}
                        </span>
                        <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                          {token.region}
                        </span>
                        {token.vintage && (
                          <span className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full ml-2">
                            Vintage: {token.vintage}
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 text-sm mb-2 line-clamp-2">{token.description}</p>
                      <div className="flex items-center mb-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-4 w-4 ${i < token.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                            />
                          ))}
                        </div>
                        <span className="text-xs text-gray-500 ml-2">({token.reviewCount} reviews)</span>
                      </div>
                      {token.standard && (
                        <div className="flex items-center text-xs text-gray-500">
                          <Shield className="h-3 w-3 mr-1" />
                          Verified by {token.standard}
                        </div>
                      )}
                    </div>
                    <div className="md:w-1/4 flex flex-col justify-between">
                      <div>
                        <div className="text-lg font-bold text-gray-800 mb-1">${token.tokenPrice.toFixed(2)}</div>
                        <div className="text-sm text-gray-600 mb-4">per ton • {token.offsetAmount} tons available</div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Button variant="primary" onClick={() => handleViewToken(token)}>
                          View Details
                        </Button>
                        <Button 
                          variant="secondary" 
                          disabled={!isWalletConnected}
                          title={!isWalletConnected ? "Connect wallet to buy tokens" : ""}
                        >
                          Buy Token
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <p className="text-gray-600 mb-4">No carbon credit tokens match your search criteria.</p>
          <Button variant="primary" onClick={clearFilters}>
            Clear Filters
          </Button>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <nav className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}
            >
              Previous
            </Button>

            <div className="flex space-x-1">
              {[...Array(totalPages)].map((_, i) => (
                <Button
                  key={i}
                  variant={currentPage === i + 1 ? "primary" : "ghost"}
                  size="sm"
                  onClick={() => handlePageChange(i + 1)}
                  className={`w-8 h-8 ${currentPage === i + 1 ? "bg-green-600" : ""}`}
                >
                  {i + 1}
                </Button>
              ))}
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""}
            >
              Next
            </Button>
          </nav>
        </div>
      )}

      {/* Token Detail Modal */}
      {selectedToken && (
        <TokenDetailModal 
          token={selectedToken} 
          onClose={closeModal} 
          isWalletConnected={isWalletConnected}
        />
      )}
    </div>
  )
}

// Leaf icon component
const Leaf = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"></path>
    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path>
  </svg>
)

// Star icon component
const Star = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
  </svg>
)

// Shield icon component
const Shield = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
  </svg>
)

export default Marketplace
