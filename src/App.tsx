import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import axios from 'axios'
import Header from './components/Header'
import Home from './components/Home'
import PackOpener from './components/PackOpener'
import Scrims from './components/Scrims'
import TeamManagement from './components/TeamManagement'
import Login from './components/Login'
import Register from './components/Register'
import MatchSimulation from './components/MatchSimulation'
import { CardType, UserType } from './types'

function App() {
  const [user, setUser] = useState<UserType | null>(null)
  const [packedCards, setPackedCards] = useState<CardType[]>([])
  const [activeTeam, setActiveTeam] = useState<CardType[]>([])
  const [gold, setGold] = useState(1000)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      axios.get('/api/user', {
        headers: { Authorization: `Bearer ${token}` }
      }).then(response => {
        setUser(response.data)
        setPackedCards(response.data.packedCards || [])
        setActiveTeam(response.data.activeTeam || [])
        setGold(response.data.gold || 1000)
      }).catch(() => {
        localStorage.removeItem('token')
      })
    }
  }, [])

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
    setPackedCards([])
    setActiveTeam([])
    setGold(1000)
  }

  const saveUserData = (updatedUser: UserType) => {
    const token = localStorage.getItem('token')
    if (token) {
      axios.put('/api/user', updatedUser, {
        headers: { Authorization: `Bearer ${token}` }
      }).then(() => {
        setUser(updatedUser)
      }).catch(console.error)
    }
  }

  const addPackedCards = (newCards: CardType[]) => {
    const updatedCards = [...packedCards, ...newCards]
    setPackedCards(updatedCards)
    if (user) {
      const updatedUser = { ...user, packedCards: updatedCards, gold }
      saveUserData(updatedUser)
    }
  }

  const updateActiveTeam = (newTeam: CardType[]) => {
    setActiveTeam(newTeam)
    if (user) {
      const updatedUser = { ...user, activeTeam: newTeam }
      saveUserData(updatedUser)
    }
  }

  const addGold = (amount: number) => {
    const newGold = gold + amount
    setGold(newGold)
    if (user) {
      const updatedUser = { ...user, gold: newGold }
      saveUserData(updatedUser)
    }
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white">
        <Header gold={gold} user={user} logout={logout} />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/register" element={<Register setUser={setUser} />} />
            <Route
              path="/"
              element={user ? <Home /> : <Navigate to="/login" />}
            />
            <Route
              path="/pack-opener"
              element={
                user ? (
                  <PackOpener
                    addPackedCards={addPackedCards}
                    gold={gold}
                    setGold={setGold}
                  />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/scrims"
              element={
                user ? (
                  <Scrims
                    packedCards={packedCards}
                    activeTeam={activeTeam}
                    addGold={addGold}
                  />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/team"
              element={
                user ? (
                  <TeamManagement
                    packedCards={packedCards}
                    activeTeam={activeTeam}
                    updateActiveTeam={updateActiveTeam}
                  />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/match-simulation"
              element={
                user ? (
                  <MatchSimulation activeTeam={activeTeam} addGold={addGold} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App