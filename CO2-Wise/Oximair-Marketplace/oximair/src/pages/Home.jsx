"use client"

import { Link } from "react-router-dom"
import { Leaf, BarChart2, Users, DollarSign } from 'lucide-react'
import StatsCard from "../components/StatsCard"
import Button from "../components/Button"
import { stats } from "../mockData"

const Home = ({ connectWallet }) => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-700 to-green-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">Tokenize Your Carbon, Empower the Earth</h1>
              <p className="mt-6 text-lg text-green-100">
                Join our blockchain-powered marketplace for transparent, efficient carbon credit trading. Make a real
                impact on climate change while growing your green portfolio.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Button
                  variant="secondary"
                  size="lg"
                  className="bg-white text-green-700 hover:bg-green-50"
                  onClick={connectWallet}
                >
                  Connect Wallet
                </Button>
                <Link to="/marketplace">
                  <Button
                    variant="primary"
                    size="lg"
                    className="bg-green-600 hover:bg-green-500 border border-green-500"
                  >
                    Explore Marketplace
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <img
                src="/placeholder.svg?height=400&width=500"
                alt="Carbon Credit Illustration"
                className="w-full h-auto rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Our Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCard title="Carbon Saved" value={stats.totalCarbonSaved} icon={Leaf} color="#10B981" />
            <StatsCard title="Tokens Traded" value={stats.tokensTraded} icon={BarChart2} color="#3B82F6" />
            <StatsCard title="Companies Onboarded" value={stats.companiesOnboarded} icon={Users} color="#8B5CF6" />
            <StatsCard title="Avg. Token Price" value={stats.averageTokenPrice} icon={DollarSign} color="#F59E0B" />
          </div>
        </div>
      </section>

      {/* Map Section */}
      {/* <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">Live Climate Impact Map</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Visualize real-time data on urban heat islands and microclimates affected by carbon emissions and offset
              projects.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
            <div className="aspect-w-16 aspect-h-9 bg-gray-100 relative">
              <img
                src="/placeholder.svg?height=600&width=1200"
                alt="Climate Impact Map"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white bg-opacity-80 p-6 rounded-lg text-center">
                  <p className="text-gray-800 font-medium">Interactive map visualization coming soon</p>
                  <p className="text-sm text-gray-600 mt-2">
                    Explore the impact of carbon credits on global climate patterns
                  </p>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-red-500 mr-2"></div>
                  <span className="text-sm text-gray-700">High Emission Zones</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-yellow-500 mr-2"></div>
                  <span className="text-sm text-gray-700">Moderate Impact</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-sm text-gray-700">Carbon Offset Projects</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-blue-500 mr-2"></div>
                  <span className="text-sm text-gray-700">Water Conservation</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* How It Works */}
      <section className="py-16 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">How It Works</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Our blockchain-based platform makes carbon credit trading simple, transparent, and effective.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-green-600 font-bold text-xl">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Connect Your Wallet</h3>
              <p className="text-gray-600">
                Link your Web3 wallet to our platform to start buying, selling, or trading carbon credit tokens.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-green-600 font-bold text-xl">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Browse the Marketplace</h3>
              <p className="text-gray-600">
                Explore verified carbon credit tokens from projects around the world, with detailed impact information.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-green-600 font-bold text-xl">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Make an Impact</h3>
              <p className="text-gray-600">
                Purchase tokens to offset your carbon footprint or sell your company's carbon credits to fund
                sustainability.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link to="/about">
              <Button variant="secondary" size="lg">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-green-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold">Ready to Make a Difference?</h2>
          <p className="mt-4 text-lg text-green-100 max-w-2xl mx-auto">
            Join thousands of individuals and companies already trading carbon credits on our platform.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/marketplace">
              <Button variant="secondary" size="lg" className="bg-white text-green-800 hover:bg-green-50">
                Explore Marketplace
              </Button>
            </Link>
            <Link to="/sell">
              <Button variant="primary" size="lg" className="bg-green-600 hover:bg-green-500 border border-green-500">
                List Your Credits
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
