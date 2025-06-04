// Components
import AdminNavbar from '../components/AdminNavbar';
import Footer from '../../components/Footer';
import Products from '../../components/Products';

function AdminProductsPage() {
  return (
    <>

      <AdminNavbar />
      
      <div className="main-container">
        
        <h1 className='fs-4 text-center'>Admin Products Page</h1>

      </div>

      <div>

        <Products />

      </div>
       
       
      <Footer />
    </>
  )
}

export default AdminProductsPage