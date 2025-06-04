import React from 'react'
import { Link } from "react-router-dom";


export default function Footer() {
  return (
    <div className='footer d-flex flex-column flex-lg-row bg-body-tertiary p-2 p-lg-4 border border-top'>

      <div className='footer-section p-2'>
         <Link to="/" className="nav-link">
            <img src={'./ecommerce-logo-tranparent-bg.png'} alt="" />
         </Link>
        
      </div>

      <div className='footer-section p-3 mx-auto'>
         <div className="slogan">
            <p className='slogan-text mx-auto text-primary fw-bold'>All of your favorite brands at deep discounts all in one convenient location.
            </p>
         </div>
      </div>

      <div className='footer-section'>
        <ul className='navbar-nav d-flex flex-column gap-2 py-2 me-0 me-lg-5'>
          <Link to="/aboutPage" className="nav-link link m-0 p-0">
            About
          </Link>

          <Link to="/contactPage" className="nav-link link p-0">
            Contact
          </Link>
                   
        </ul>
      </div>




    </div>
  )
}
