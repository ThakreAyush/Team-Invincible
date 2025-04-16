"use client"

import { useState } from "react"
import { X, Leaf, MapPin, Calendar, Shield, Star, DollarSign, Info, AlertCircle, Check } from 'lucide-react'
import Button from "./Button"

const TokenDetailModal = ({ token, onClose, isWalletConnected }) => {
  const [purchaseAmount, setPurchaseAmount] = useState(1)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [activeTab, setActiveTab] = useState("details") // details, impact, reviews

  const handlePurchaseAmountChange = (e) => {
    const value = parseInt(e.target.value)
    if (value > 0 && value <= token.offsetAmount) {
      setPurchaseAmount(value)
    }
  }

  const handleBuyToken = () => {
    if (isWalletConnected) {
      setShowConfirmation(true)
    }
  }

  const handleConfirmPurchase = () => {
    // This would connect to blockchain in a real implementation
    setTimeout(() => {
      onClose()
    }, 1500)
  }

  const totalPrice = (token.tokenPrice * purchaseAmount).toFixed(2)

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {showConfirmation ? (
          <div className="p-6">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-xl font-bold text-gray-800">Confirm Purchase</h3>
              <button onClick={() => setShowConfirmation(false)} className="text-gray-400 hover:text-gray-500">
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <div className="flex items-start">
                <Info className="h-5 w-5 text-green-600 mt-0.5 mr-3" />
                <div>
                  <h4 className="font-medium text-green-800">Transaction Summary</h4>
                  <p className="text-green-700 text-sm mt-1">
                    You are about to purchase {purchaseAmount} carbon credit {purchaseAmount === 1 ? "token" : "tokens"} from {token.companyName}.
                  </p>
                </div>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-4 mb-6">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-500">Project</p>
                  <p className="font-medium">{token.companyName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Type</p>
                  <p className="font-medium">{token.type}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Quantity</p>
                  <p className="font-medium">{purchaseAmount} {purchaseAmount === 1 ? "token" : "tokens"} ({purchaseAmount} tons CO₂)</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Price per Token</p>
                  <p className="font-medium">${token.tokenPrice.toFixed(2)}</p>
                </div>
              </div>
              <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
                <p className="font-medium">Total Price</p>
                <p className="text-xl font-bold">${totalPrice}</p>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 mr-3" />
                <div>
                  <h4 className="font-medium text-yellow-800">Important Information</h4>
                  <p className="text-yellow-700 text-sm mt-1">
                    This transaction will be processed on the blockchain and cannot be reversed once confirmed. 
                    Gas fees may apply depending on network conditions.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <Button variant="ghost" onClick={() => setShowConfirmation(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleConfirmPurchase}>
                <Check className="h-5 w-5 mr-2" />
                Confirm Purchase
              </Button>
            </div>
          </div>
        ) : (
          <div className="p-6">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-xl font-bold text-gray-800">{token.companyName}</h3>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="md:col-span-2">
                <div className="bg-green-100 rounded-lg p-6 flex items-center justify-center h-48 md:h-64">
                  {token.imageUrl ? (
                    <img 
                      src={token.imageUrl || "/placeholder.svg"} 
                      alt={token.companyName} 
                      className="max-h-full max-w-full object-contain rounded"
                    />
                  ) : (
                    <div className="text-center">
                      <Leaf className="h-16 w-16 text-green-600 mx-auto" />
                      <p className="mt-2 text-green-700">Project Image</p>
                    </div>
                  )}
                </div>

                {/* Tabs Navigation */}
                <div className="mt-6 border-b border-gray-200">
                  <div className="flex space-x-8">
                    <button
                      className={`py-2 px-1 border-b-2 font-medium text-sm ${
                        activeTab === "details"
                          ? "border-green-500 text-green-600"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      }`}
                      onClick={() => setActiveTab("details")}
                    >
                      Details
                    </button>
                    <button
                      className={`py-2 px-1 border-b-2 font-medium text-sm ${
                        activeTab === "impact"
                          ? "border-green-500 text-green-600"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      }`}
                      onClick={() => setActiveTab("impact")}
                    >
                      Environmental Impact
                    </button>
                    <button
                      className={`py-2 px-1 border-b-2 font-medium text-sm ${
                        activeTab === "reviews"
                          ? "border-green-500 text-green-600"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      }`}
                      onClick={() => setActiveTab("reviews")}
                    >
                      Reviews
                    </button>
                  </div>
                </div>

                {/* Tab Content */}
                <div className="mt-4">
                  {activeTab === "details" && (
                    <div>
                      <p className="text-gray-700 mb-4">{token.description}</p>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center">
                          <MapPin className="h-5 w-5 text-gray-500 mr-2" />
                          <span className="text-gray-700">{token.region}</span>
                        </div>
                        {token.vintage && (
                          <div className="flex items-center">
                            <Calendar className="h-5 w-5 text-gray-500 mr-2" />
                            <span className="text-gray-700">Vintage: {token.vintage}</span>
                          </div>
                        )}
                        {token.standard && (
                          <div className="flex items-center">
                            <Shield className="h-5 w-5 text-gray-500 mr-2" />
                            <span className="text-gray-700">Verified by {token.standard}</span>
                          </div>
                        )}
                        <div className="flex items-center">
                          <Star className="h-5 w-5 text-yellow-400 mr-2" />
                          <span className="text-gray-700">{token.rating} out of 5</span>
                        </div>
                      </div>

                      {token.certificateUrl && (
                        <div className="mt-4">
                          <a
                            href={token.certificateUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-green-600 hover:text-green-800 flex items-center"
                          >
                            <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                              />
                            </svg>
                            View Verification Certificate
                          </a>
                        </div>
                      )}
                    </div>
                  )}

                  {activeTab === "impact" && (
                    <div>
                      <h4 className="font-medium text-gray-800 mb-3">Environmental Benefits</h4>
                      <div className="bg-green-50 p-4 rounded-lg mb-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                              <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
                                />
                              </svg>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Equivalent to removing</p>
                              <p className="font-medium">{Math.round(token.offsetAmount * 0.21)} cars</p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                              <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
                                />
                              </svg>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Equivalent to planting</p>
                              <p className="font-medium">{Math.round(token.offsetAmount * 16.5)} trees</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <h4 className="font-medium text-gray-800 mb-3">Project Impact</h4>
                      <p className="text-gray-700 mb-4">
                        {token.impactDescription || 
                          `This ${token.type.toLowerCase()} project not only reduces carbon emissions but also contributes to sustainable development goals including biodiversity conservation, community development, and renewable energy adoption.`
                        }
                      </p>

                      <h4 className="font-medium text-gray-800 mb-3">Sustainable Development Goals</h4>
                      <div className="flex flex-wrap gap-2">
                        {token.sdgs ? token.sdgs.map((sdg, index) => (
                          <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                            {sdg}
                          </span>
                        )) : (
                          <>
                            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                              Climate Action
                            </span>
                            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                              Life on Land
                            </span>
                            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                              Responsible Consumption
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  )}

                  {activeTab === "reviews" && (
                    <div>
                      <div className="flex items-center mb-4">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-5 w-5 ${i < token.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                            />
                          ))}
                        </div>
                        <span className="ml-2 text-gray-700">{token.rating} out of 5</span>
                        <span className="ml-2 text-gray-500">({token.reviewCount} reviews)</span>
                      </div>

                      {token.reviews ? (
                        <div className="space-y-4">
                          {token.reviews.map((review, index) => (
                            <div key={index} className="border-b border-gray-200 pb-4">
                              <div className="flex items-center mb-1">
                                <div className="flex">
                                  {[...Array(5)].map((_, i) => (
                                    <Star 
                                      key={i} 
                                      className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                                    />
                                  ))}
                                </div>
                                <span className="ml-2 font-medium text-gray-700">{review.author}</span>
                              </div>
                              <p className="text-gray-600 text-sm">{review.comment}</p>
                              <p className="text-gray-400 text-xs mt-1">{review.date}</p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-gray-500 italic">No reviews available for this project yet.</div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
                  <h4 className="font-medium text-gray-800 mb-4">Purchase Tokens</h4>
                  
                  <div className="mb-4">
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                      Price per Token
                    </label>
                    <div className="flex items-center">
                      <DollarSign className="h-5 w-5 text-gray-500 mr-1" />
                      <span className="text-xl font-bold text-gray-800">{token.tokenPrice.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                      Quantity (tons)
                    </label>
                    <div className="flex">
                      <button
                        className="bg-gray-200 px-3 py-2 rounded-l-md hover:bg-gray-300"
                        onClick={() => purchaseAmount > 1 && setPurchaseAmount(purchaseAmount - 1)}
                      >
                        -
                      </button>
                      <input
                        type="number"
                        id="amount"
                        value={purchaseAmount}
                        onChange={handlePurchaseAmountChange}
                        min="1"
                        max={token.offsetAmount}
                        className="w-full text-center border-y border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                      <button
                        className="bg-gray-200 px-3 py-2 rounded-r-md hover:bg-gray-300"
                        onClick={() => purchaseAmount < token.offsetAmount && setPurchaseAmount(purchaseAmount + 1)}
                      >
                        +
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {token.offsetAmount} tokens available
                    </p>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Total Price
                    </label>
                    <div className="text-2xl font-bold text-gray-800">
                      ${totalPrice}
                    </div>
                  </div>

                  <Button
                    variant="primary"
                    className="w-full"
                    onClick={handleBuyToken}
                    disabled={!isWalletConnected}
                  >
                    {isWalletConnected ? "Buy Now" : "Connect Wallet to Buy"}
                  </Button>

                  {!isWalletConnected && (
                    <p className="text-xs text-center text-gray-500 mt-2">
                      You need to connect your wallet before making a purchase
                    </p>
                  )}
                </div>

                <div className="mt-4 bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <h4 className="font-medium text-gray-800 mb-2">Token Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Token ID:</span>
                      <span className="text-gray-700 font-mono">{token.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Type:</span>
                      <span className="text-gray-700">{token.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Region:</span>
                      <span className="text-gray-700">{token.region}</span>
                    </div>
                    {token.vintage && (
                      <div className="flex justify-between">
                        <span className="text-gray-500">Vintage:</span>
                        <span className="text-gray-700">{token.vintage}</span>
                      </div>
                    )}
                    {token.createdAt && (
                      <div className="flex justify-between">
                        <span className="text-gray-500">Listed:</span>
                        <span className="text-gray-700">{new Date(token.createdAt).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default TokenDetailModal
