import React from 'react'
import { Link } from "react-router-dom"
export default function Confirmation() {
  return (
    <>
      {/* <!-- Page Header Start --> */}
      <div className="container-fluid page-header mb-5 p-0" style={{ backgroundImage: "url(img/carousel-bg-1.jpg)" }}>
        <div className="container-fluid page-header-inner py-5">
          <div className="container text-center">
            <h1 className="display-3 text-white mb-3 animated slideInDown">Thank You</h1>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb justify-content-center text-uppercase">
                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                <li className="breadcrumb-item text-white active" aria-current="page">Thank You</li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
      {/* <!-- Page Header End --> */}
      <div className='text-center my-5'>
        <h4>Your Order has been placed</h4>
        <h4>Now You can track your order in profile page</h4>
        <Link to="/shop" className='btn btn-primary'>Shop More</Link>
      </div>
    </>
  )
}
