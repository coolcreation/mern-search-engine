// ProductPage.jsx

import Navbar from "../components/Navbar"
import Footer from '../components/Footer'
import Searchbox from "../components/Searchbox"

function ProductPage() {
  return (
    <>

      <Navbar />
      
      <div className="main-container">
        
       <div>
         <h1 className='fs-4 text-start ps-1 ps-lg-3'>Product Page</h1>
         <Searchbox />
       </div>
      </div>
        
      <Footer />
    </>
  )
}

export default ProductPage







