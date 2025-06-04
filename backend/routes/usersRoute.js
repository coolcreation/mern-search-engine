import express from 'express'
import User from "../models/userModel.js"
const router = express.Router()

// GET ALL USERS
router.get("/", async (req, res) => {
    try {
        const users = await User.find() 
        res.json(users)  
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ code: 500, status: "Error fetching users" })
    }
})

// GET USER by ID
router.get("/:id", async (req, res) => {
    try {
        const selectedUser = await User.findById(req.params.id)
        if (!selectedUser) {
            return res.status(404).json({ status: "User not found" })
        }
        res.json({ status: `User ${selectedUser.name} selected` })
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ code: 500, status: "Error deleting user" })
    }
})

// POST NEW USER
router.post("/", async (req, res) => {
  const { name, age, email } = req.body  
  console.log('Request body:', req.body)
  try {
      const newUser = new User({ name, age, email })  
      await newUser.save()  
      res.status(201).json(newUser)  
      console.log("New User created")
  } catch (err) {
      console.log(err.message)
      res.status(500).json({ code: 500, status: "Error saving user" })
  }
})

router.put('/:id', async (req, res) => {
    try {
      const userId = req.params.id
      const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true })
  
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' })
      }
  
      res.json(updatedUser)
    } catch (error) {
      console.error('Error updating user:', error)
      res.status(500).json({ message: 'Internal server error' })
    }
})

// DELETE USER
router.delete("/:id", async (req, res) => {
    try {
        const selectedUser = await User.findByIdAndDelete(req.params.id)
        if (!selectedUser) {
            return res.status(404).json({ status: "User not found" })
        }
        res.json({ status: `User ${selectedUser.name} selected` })
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ code: 500, status: "Error deleting user" })
    }
})

export default router