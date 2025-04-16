"use client"

import { useState } from "react"
import { Leaf, Info, DollarSign, MapPin, Calendar, Award, BarChart2, ExternalLink } from 'lucide-react'
import Button from "./Button"

const TokenCard = ({ 
  token, 
  showActions = true, 
  isPortfolio = false, 
  viewType = "grid",
  onQuickView = () => {},
  isWalletConnected = false
}) => {
  const [showDetails, setShowDetails] = useState(false)

  const handleBuyClick = () => {
    if (!isWalletConnected) {
      alert("Please connect your wallet to purchase tokens")
      return
    }
    // Handle buy action
    alert(`Initiating purchase of ${token.offsetAmount} tons from ${token.companyName}`)
  }

  if (viewType === "list") {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300 mb-4">
        <div className="p-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="bg-green-100 p-2 rounded-full">
                <Leaf className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-semibold text-gray-800">{token.companyName}</h3>
                <div className="flex items-center text-sm text-gray-500">
                  <MapPin className="h-3 w-3 mr-1" />
                  <span>{token.region}</span>
                  <span className="mx-2">•</span>
                  <span>{token.type}</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex flex-col">
                <span className="text-xs text-gray-500">Offset Amount</span>
                <span className="font-medium">{token.offsetAmount} tons</span>
              </div>
              
              <div className="flex flex-col">
                <span className="text-xs text-gray-500">Token Price</span>
                <div className="flex items-center">
                  <DollarSign className="h-4 w-4 text-gray-600" />
                  <span className="font-medium">{token.tokenPrice}</span>
                </div>
              </div>
              
              {token.rating && (
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500">Rating</span>
                  <div className="flex items-center">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <svg 
                          key={i} 
                          className={`h-4 w-4 ${i < token.rating ? "text-yellow-400" : "text-gray-300"}`} 
                          fill="currentColor" 
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              
              {showActions && (
                <div className="flex space-x-2 ml-auto">
                  <Button 
                    variant="secondary" 
                    size="sm"
                    onClick={() => onQuickView(token)}
                  >
                    Quick View
                  </Button>
                  
                  {isPortfolio ? (
                    <Button variant="primary" size="sm">
                      Manage
                    </Button>
                  ) : (
                    <Button 
                      variant="primary" 
                      size="sm"
                      onClick={handleBuyClick}
                    >
                      Buy Token
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
      <div className="p-4 flex-grow">
        <div className="flex justify-between items-start">
          <div className="flex items-center">
            <div className="bg-green-100 p-2 rounded-full">
              <Leaf className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="ml-2 text-lg font-semibold text-gray-800 truncate">{token.companyName}</h3>
          </div>
          <button onClick={() => setShowDetails(!showDetails)} className="text-gray-500 hover:text-green-600">
            <Info className="h-5 w-5" />
          </button>
        </div>

        {token.imageUrl && (
          <div className="mt-3 h-32 w-full overflow-hidden rounded-md">
            <img 
              src={token.imageUrl || "/placeholder.svg"} 
              alt={token.companyName} 
              className="h-full w-full object-cover"
            />
          </div>
        )}

        <div className="mt-4 grid grid-cols-2 gap-2">
          <div className="flex flex-col">
            <span className="text-xs text-gray-500">Offset Amount</span>
            <span className="font-medium">{token.offsetAmount} tons</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-gray-500">Token Price</span>
            <div className="flex items-center">
              <DollarSign className="h-4 w-4 text-gray-600" />
              <span className="font-medium">{token.tokenPrice}</span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-gray-500">Region</span>
            <div className="flex items-center">
              <MapPin className="h-4 w-4 text-gray-600" />
              <span className="ml-1 truncate">{token.region}</span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-gray-500">Type</span>
            <span className="truncate">{token.type}</span>
          </div>
        </div>

        {token.rating && (
          <div className="mt-3 flex items-center">
            <span className="text-xs text-gray-500 mr-1">Rating:</span>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg 
                  key={i} 
                  className={`h-4 w-4 ${i < token.rating ? "text-yellow-400" : "text-gray-300"}`} 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="ml-1 text-xs text-gray-500">({token.reviewCount || 0})</span>
          </div>
        )}

        {showDetails && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">{token.description}</p>
            
            {token.vintage && (
              <div className="mt-2 flex items-center text-sm text-gray-600">
                <Calendar className="h-4 w-4 mr-1 text-gray-500" />
                <span>Vintage: {token.vintage}</span>
              </div>
            )}
            
            {token.standard && (
              <div className="mt-1 flex items-center text-sm text-gray-600">
                <Award className="h-4 w-4 mr-1 text-gray-500" />
                <span>Standard: {token.standard}</span>
              </div>
            )}
            
            {token.impact && (
              <div className="mt-1 flex items-center text-sm text-gray-600">
                <BarChart2 className="h-4 w-4 mr-1 text-gray-500" />
                <span>Impact: {token.impact}</span>
              </div>
            )}
            
            {token.certificateUrl && (
              <a
                href={token.certificateUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center text-sm text-green-600 hover:text-green-800"
              >
                <ExternalLink className="h-4 w-4 mr-1" />
                View Certificate
              </a>
            )}
          </div>
        )}
      </div>

      {showActions && (
        <div className="p-4 pt-0 mt-auto">
          <div className="pt-4 border-t border-gray-200">
            {isPortfolio ? (
              <div className="flex space-x-2">
                <button className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors">
                  Redeem
                </button>
                <button className="flex-1 bg-white text-green-600 py-2 px-4 rounded-md border border-green-600 hover:bg-green-50 transition-colors">
                  Sell Back
                </button>
              </div>
            ) : (
              <button 
                className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
                onClick={handleBuyClick}
              >
                Buy Token
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default TokenCard

