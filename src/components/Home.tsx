import React from 'react'
import { Link } from 'react-router-dom'
import { Package, Users, UserSquare } from 'lucide-react'

const Home: React.FC = () => {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-8">Welcome to EUSL Card Game</h1>
      <img src="/eusl-logo.svg" alt="EUSL Logo" className="w-48 h-48 mx-auto mb-8" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Link to="/pack-opener" className="bg-red-700 p-6 rounded-lg hover:bg-red-600 transition-colors">
          <Package size={48} className="mx-auto mb-4" />
          <h2 className="text-2xl font-semibold">Pack Opener</h2>
          <p>Open new card packs and expand your collection</p>
        </Link>
        <Link to="/scrims" className="bg-green-700 p-6 rounded-lg hover:bg-green-600 transition-colors">
          <Users size={48} className="mx-auto mb-4" />
          <h2 className="text-2xl font-semibold">Scrims</h2>
          <p>Play games with your team against others</p>
        </Link>
        <Link to="/team" className="bg-purple-700 p-6 rounded-lg hover:bg-purple-600 transition-colors">
          <UserSquare size={48} className="mx-auto mb-4" />
          <h2 className="text-2xl font-semibold">Team Management</h2>
          <p>Manage your team and player cards</p>
        </Link>
      </div>
    </div>
  )
}

export default Home