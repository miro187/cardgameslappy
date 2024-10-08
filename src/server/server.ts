import express from 'express'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
app.use(express.json())

mongoose.connect(process.env.MONGODB_URI as string)

const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  packedCards: [Object],
  activeTeam: [Object],
  gold: { type: Number, default: 1000 }
})

const User = mongoose.model('User', UserSchema)

const authenticateToken = (req: any, res: any, next: any) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.JWT_SECRET as string, (err: any, user: any) => {
    if (err) return res.sendStatus(403)
    req.user = user
    next()
  })
}

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body

  try {
    const user = await User.findOne({ username })
    if (!user) {
      return res.status(400).json({ message: 'User not found' })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, { expiresIn: '1d' })

    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        packedCards: user.packedCards,
        activeTeam: user.activeTeam,
        gold: user.gold
      }
    })
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
})

app.post('/api/register', async (req, res) => {
  const { username, password } = req.body

  try {
    let user = await User.findOne({ username })
    if (user) {
      return res.status(400).json({ message: 'User already exists' })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    user = new User({
      username,
      password: hashedPassword
    })

    await user.save()

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, { expiresIn: '1d' })

    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        packedCards: user.packedCards,
        activeTeam: user.activeTeam,
        gold: user.gold
      }
    })
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
})

app.get('/api/user', authenticateToken, async (req: any, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password')
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    res.json(user)
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
})

app.put('/api/user', authenticateToken, async (req: any, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.user.id, req.body, { new: true }).select('-password')
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    res.json(user)
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))