import React from 'react'
import { Routes,  Route, BrowserRouter} from 'react-router-dom';

// Components
// import Navbar from './components/Navbar.jsx'
// import Footer from './components/Footer.jsx'

// Pages
import HomePage from './pages/HomePage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import CartPage from './pages/CartPage.jsx'
import ContactPage from './pages/ContactPage.jsx';
import ProductPage from './pages/ProductPage.jsx'
// Admin Pages
import AdminProductsPage from './admin/pages/AdminProductsPage.jsx';
import AdminHomePage from './admin/pages/AdminHomePage.jsx';


function App() {
    
  return (
    <>
      <Routes>
        {/* Main root route */}
        <Route path="/" element={ <HomePage /> }/>
        <Route path="/AboutPage" element={ <AboutPage /> }/>
        <Route path="/CartPage" element={ <CartPage /> }/>
        <Route path="/ContactPage" element={ <ContactPage /> }/>
        <Route path="/ProductPage" element={ <ProductPage /> }/>

        <Route path="/AdminHomePage" element={ <AdminHomePage /> }/>
        <Route path="/AdminProductPage" element={ <AdminProductsPage /> }/>
        
      </Routes>  
    </>
  )
}

export default App






//   let marks = 71;

//   return (
//    <>
//       <Navbar />
//       <HomePage />
//       {/* Ternary */}
//       <div className="bg-dark mx-auto p-3 my-2">

//       {
//       marks > 81 
//       ? <h3 className="w-100 bg-success text-white p-2">True</h3> 
//       : <h3 className="bg-danger text-white p-2">False</h3>
//       }

//       </div>

//       {/* IIFE */}
//       <div className="bg-light mx-auto p-2 my-2">

//       {(
//         ()=> {
//           if(marks > 80){
//             return <h3>If statement</h3>
//           }
//           else if(marks > 70 && marks < 80){
//               return <h3>Else/If statement</h3>
//           }
//           else{
//               return <h3>ELSE</h3>
//           }
//         }
//       )()}

//       </div>
   
//    </>
//   )
// }
