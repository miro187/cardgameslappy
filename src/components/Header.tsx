import React from 'react'
import { Link } from 'react-router-dom'
import { Coins, User } from 'lucide-react'
import { UserType } from '../types'

interface HeaderProps {
  gold: number
  user: UserType | null
}

const Header: React.FC<HeaderProps> = ({ gold, user }) => {
  return (
    <header className="bg-red-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 text-2xl font-bold">
          <img src="/eusl-logo.svg" alt="EUSL Logo" className="h-10 w-auto" />
          <span>EUSL Card Game</span>
        </Link>
        {user && (
          <nav className="flex items-center">
            <ul className="flex space-x-4 mr-4">
              <li><Link to="/pack-opener" className="hover:text-red-200">Pack Opener</Link></li>
              <li><Link to="/scrims" className="hover:text-red-200">Scrims</Link></li>
              <li><Link to="/team" className="hover:text-red-200">Team</Link></li>
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
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}

export default Header