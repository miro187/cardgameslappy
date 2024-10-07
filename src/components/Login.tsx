import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserType } from '../types'

interface LoginProps {
  setUser: (user: UserType) => void
}

const Login: React.FC<LoginProps> = ({ setUser }) => {
  const [username, setUsername] = useState('')
  const navigate = useNavigate()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (username.trim()) {
      const newUser: UserType = {
        username,
        packedCards: [],
        activeTeam: [],
        gold: 1000
      }
      localStorage.setItem('user', JSON.stringify(newUser))
      setUser(newUser)
      navigate('/')
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form onSubmit={handleLogin} className="bg-gray-800 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
          className="w-full p-2 mb-4 bg-gray-700 rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Login
        </button>
      </form>
    </div>
  )
}

export default Login