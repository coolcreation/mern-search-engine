/***************************************** 
Cart model references products and users:

User:     name, age, email
Product:  name, price, description, stock

Referencing:
userId → User
productId → Product

*****************************************/

import mongoose from "mongoose"

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: { type: Number, default: 1 }
    }
  ]
}, { timestamps: true })

const Cart = mongoose.model("Cart", cartSchema)
export default Cart
