
import React, { useEffect, useState } from 'react'


// Components
import Navbar from "../components/Navbar"
import Footer from '../components/Footer';


const CartPage = () => {
  const [cartItems, setCartItems] = useState([])

  useEffect(() => {
    async function fetchSearchKey() {
      try {
        const response = await fetch("http://localhost:8000/api/algolia-key"); // Call secure endpoint

        // Try reading raw response text first
        const raw = await response.text()
        console.log('Raw response:', raw)

        // Then manually parse if needed
        const data = JSON.parse(raw)
        setCartItems(data)
        console.log(data)
      } catch (error) {
        console.error('Error getting search key:', error)
      }
    }

    fetchSearchKey()
  }, [])

 
  return (
    <>

      <Navbar />
      
      <div className="main-container">
        
       <div>
          <h1 className='fs-4 text-start ps-1 ps-lg-3'>Cart Page</h1>
          
          <h3 className='text-center'>Cart Items</h3>
          <ul>
            {cartItems.map((item, idx) => (
              <li key={idx}>{item.baseName} - ${item.price}</li>
            ))}
          </ul>
       </div>

      </div>
        
      <Footer />
    </>


  )
}

export default CartPage

