// models/productModel.js

import mongoose from "mongoose"

const imageSchema = new mongoose.Schema({
  url: { type: String, required: true },
  alt: { type: String }
}, { _id: false })

const variantSchema = new mongoose.Schema({
  name: { type: String, required: true },       // "Red - Large"
  sku: { type: String, required: true },        // Unique identifier for variant
  price: { type: Number, required: true },
  stock: { type: Number, default: 0 },
  imageURL: [imageSchema]
}, { _id: false })

const productSchema = new mongoose.Schema({
  baseName: { type: String, required: true },   // e.g. "T-Shirt"
  description: String,
  brand: String,
  categories: [String],
  tags: [String],                               // Dynamic tags per product
  sku: String,                                  // SKU if product-level only
  stock: { type: Number, default: 0 },          // Stock if product-level only
  imageURL: [imageSchema],                      // Optional product-level images
  variants: [variantSchema]                     // Optional variants
}, { timestamps: true })

const product = mongoose.model("Product", productSchema)
export default product

