// Components
import Navbar from "../components/Navbar"
import Footer from '../components/Footer';

function HomePage() {
  return (
    <>

      <Navbar />
      
      <div className="main-container">
        
        <h1 className='fs-4 text-center'>Home Page</h1>
      </div>
       
      <Footer />
    </>
  )
}

export default HomePage