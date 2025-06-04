import { ImCart } from "react-icons/im";
import { Link } from 'react-router-dom'

export default function Navbar() {



  return (
    <>
        <nav class="navbar navbar-expand-lg bg-body-tertiary border border-bottom">
            <div class="container-fluid m-0 p-0 position-relative">

                <Link to="/" className="nav-brand ps-2 ps-lg-4 active">
                    <img src={'./ecommerce-logo-tranparent-bg.png'} alt="" />
                </Link>

                <Link className="admin-icon-container nav-link link position-absolute" to="/admin">
                    <img src={'./admin-icon.png'} alt="" width="30"/>
                </Link>

                <button class="navbar-toggler me-2" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mt-3 mt-lg-0 me-auto d-flex align-items-center m-0 ms-lg-4 w-100">

                    <li className="nav-item">
                        <Link className="nav-link link" to="/contactPage">Contact</Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link link" to="/aboutPage">About</Link>
                    </li>

                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Categories
                        </a>
                        <ul class="dropdown-menu position-absolute">
                            <li><a class="dropdown-item" href="#">Action</a></li>
                            <li><a class="dropdown-item" href="#">Another action</a></li>
                        </ul>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link link" to="/productPage">Products</Link>
                    </li>

                    <li className="nav-item ms-lg-auto me-lg-4">

                        <Link className="nav-link link position-relative d-none" to="/adminHomePage">
                          <img src={'./admin-icon.png'} alt="" width="30"/>
                        </Link>

                        <Link className="nav-link link" to="/cartPage">
                          <ImCart className="cart-icon"/>
                        </Link>
                    </li>



                </ul>

                </div>
            </div>
        </nav>

    </>
  )
}
