import express from "express"
import Cart from "../models/cartModel.js"

const router = express.Router()

// Get cart by user ID
router.get("/:userId", async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId }).populate("items.productId")
    if (!cart) return res.status(404).json({ message: "Cart not found" })
    res.json(cart)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Error fetching cart" })
  }
})

// Add item to cart
router.post("/:userId/add", async (req, res) => {
  const { productId, quantity } = req.body
  const userId = req.params.userId

  try {
    let cart = await Cart.findOne({ userId })

    if (!cart) {
      cart = new Cart({ userId, items: [{ productId, quantity }] })
    } else {
      const itemIndex = cart.items.findIndex(item =>
        item.productId.toString() === productId
      )

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity
      } else {
        cart.items.push({ productId, quantity })
      }
    }

    await cart.save()
    res.json(cart)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Error adding to cart" })
  }
})

// DELETE item from cart
router.delete("/:userId/remove/:productId", async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId })
    if (!cart) return res.status(404).json({ message: "Cart not found" })

    cart.items = cart.items.filter(item =>
      item.productId.toString() !== req.params.productId
    )

    await cart.save()
    res.json({ message: "Item removed", cart })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Error removing item" })
  }
})


export default router
