import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserType } from '../types'

interface LoginProps {
  setUser: (user: UserType) => void
}

const Login: React.FC<LoginProps> = ({ setUser }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Check for admin login
    if (username === 'Admin' && password === 'Admin') {
      const adminUser: UserType = {
        username: 'Admin',
        packedCards: [],
        activeTeam: [],
        gold: 999999 // Give admin a large amount of gold
      }
      setUser(adminUser)
      navigate('/')
      return
    }

    try {
      const response = await axios.post('/api/login', { username, password })
      const { token, user } = response.data
      localStorage.setItem('token', token)
      setUser(user)
      navigate('/')
    } catch (err) {
      setError('Invalid username or password')
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form onSubmit={handleLogin} className="bg-gray-800 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
          className="w-full p-2 mb-4 bg-gray-700 rounded"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
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