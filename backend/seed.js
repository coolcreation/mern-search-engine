import mongoose from "mongoose"
import dotenv from "dotenv"
import Product from "./models/productModel.js"

dotenv.config()

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.URL)
    console.log("✅ Connected to MongoDB")

    const sampleProducts = [
      {
        baseName: "T-Shirt",
        description: "100% cotton, comfortable fit",
        brand: "CoolWear",
        categories: ["apparel", "tops"],
        tags: ["tshirts", "cotton", "comfortable"],
        sku: "TSHIRT-001",
        imageURL: [
          { url: "https://example.com/tshirt-main.jpg", alt: "CoolWear T-Shirt main image" }
        ],
        variants: [
          {
            name: "T-Shirt - Red - M",
            sku: "TS-RED-M",
            price: 19.99,
            stock: 12,
            imageURL: [
              { url: "https://example.com/red-m.jpg", alt: "Red T-Shirt Medium" }
            ]
          },
          {
            name: "T-Shirt - Red - L",
            sku: "TS-RED-L",
            price: 19.99,
            stock: 5,
            imageURL: [
              { url: "https://example.com/red-l.jpg", alt: "Red T-Shirt Large" }
            ]
          },
          {
            name: "T-Shirt - Blue - M",
            sku: "TS-BLU-M",
            price: 21.99,
            stock: 8,
            imageURL: [
              { url: "https://example.com/blue-m.jpg", alt: "Blue T-Shirt Medium" }
            ]
          }
        ]
      },
      {
        baseName: "Baseball Cap",
        description: "Adjustable and stylish cap",
        brand: "CapKing",
        categories: ["apparel", "accessories"],
        tags: ["caps", "adjustable", "stylish", "hat"],
        sku: "CAP-001",
        imageURL: [
          { url: "https://example.com/baseball-cap-main.jpg", alt: "CapKing Baseball Cap main image" }
        ],
        variants: [
          {
            name: "Cap - Black",
            sku: "CAP-BLACK",
            price: 14.99,
            stock: 20,
            imageURL: [
              { url: "https://example.com/cap-black.jpg", alt: "Black Baseball Cap" }
            ]
          },
          {
            name: "Cap - Navy",
            sku: "CAP-NAVY",
            price: 14.99,
            stock: 15,
            imageURL: [
              { url: "https://example.com/cap-navy.jpg", alt: "Navy Baseball Cap" }
            ]
          }
        ]
      },
      {
        baseName: "Sneakers",
        description: "Lightweight and comfortable running shoes",
        brand: "SneakerPro",
        categories: ["footwear", "sports"],
        tags: ["sneakers", "running", "lightweight"],
        sku: "SNKR-001",
        imageURL: [
          { url: "https://example.com/sneakers-main.jpg", alt: "SneakerPro Sneakers main image" }
        ],
        variants: [
          {
            name: "Sneakers - White - 9",
            sku: "SNKR-WHT-9",
            price: 49.99,
            stock: 10,
            imageURL: [
              { url: "https://example.com/sneakers-white-9.jpg", alt: "White Sneakers Size 9" }
            ]
          },
          {
            name: "Sneakers - Black - 10",
            sku: "SNKR-BLK-10",
            price: 49.99,
            stock: 7,
            imageURL: [
              { url: "https://example.com/sneakers-black-10.jpg", alt: "Black Sneakers Size 10" }
            ]
          }
        ]
      },
      // Product-level only (no variants)
      {
        baseName: "Coffee Mug",
        description: "Large ceramic mug",
        brand: "MugsCo",
        categories: ["kitchen", "drinkware"],
        tags: ["mug", "ceramic"],
        sku: "MUG-001",
        imageURL: [
          { url: "https://example.com/mug.jpg", alt: "Large ceramic coffee mug" }
        ],
        variants: [
          {
            name: "Coffee Mug - Large",
            sku: "MUG-LG",
            price: 10.99,
            stock: 50,
            imageURL: [
              { url: "https://example.com/mug.jpg", alt: "Large ceramic coffee mug" }
            ]
          }
        ]
      }
    ]

    await Product.deleteMany()
    await Product.insertMany(sampleProducts)

    console.log("📦 Products seeded.")
    process.exit(0)
  } catch (err) {
    console.error("❌ Error seeding Products:", err)
    process.exit(1)
  }
}

seedProducts()
