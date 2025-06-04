import { ImCart } from "react-icons/im";
import { Link } from 'react-router-dom'

export default function AdminNavbar() {

  return (
    <>
        <nav class="navbar navbar-expand-lg bg-body-tertiary border border-bottom">
            <div class="container-fluid m-0 p-0">

                <Link to="/" className="nav-brand ps-2 ps-lg-4 active">
                    <img src={'./ecommerce-logo-tranparent-bg.png'} alt="" />
                </Link>

                <button class="navbar-toggler me-2" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mt-3 mt-lg-0 d-flex align-items-center m-0 me-lg-4 w-100">

                    <li className="nav-item ms-lg-auto">
                        <Link className="nav-link link" to="/adminHomePage">Admin-Home</Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link link" to="/adminProductPage">Admin-Products</Link>
                    </li>

                </ul>

                </div>
            </div>
        </nav>

    </>
  )
}
