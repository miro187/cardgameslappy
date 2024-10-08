import React from 'react'
import { Link } from 'react-router-dom'
import { Coins, User } from 'lucide-react'
import { UserType } from '../types'

interface HeaderProps {
  gold: number
  user: UserType | null
  logout: () => void
}

const Header: React.FC<HeaderProps> = ({ gold, user, logout }) => {
  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 text-2xl font-bold">
          <img src="/eusl-logo.svg" alt="EUSL Logo" className="h-10 w-auto" />
          <span>EUSL Card Game</span>
        </Link>
        {user ? (
          <nav className="flex items-center">
            <ul className="flex space-x-4 mr-4">
              <li><Link to="/pack-opener" className="hover:text-blue-200">Pack Opener</Link></li>
              <li><Link to="/scrims" className="hover:text-blue-200">Scrims</Link></li>
              <li><Link to="/team" className="hover:text-blue-200">Team</Link></li>
            </ul>
            <div className="flex items-center space-x-4">
              <div className="flex items-center bg-yellow-500 text-black px-3 py-1 rounded">
                <Coins size={20} className="mr-2" />
                <span className="font-bold">{gold}</span>
              </div>
              <div className="flex items-center bg-green-500 text-black px-3 py-1 rounded">
                <User size={20} className="mr-2" />
                <span className="font-bold">{user.username}</span>
              </div>
              <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
              >
                Logout
              </button>
            </div>
          </nav>
        ) : (
          <nav>
            <Link to="/login" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mr-2">
              Login
            </Link>
            <Link to="/register" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
              Register
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}

export default Header