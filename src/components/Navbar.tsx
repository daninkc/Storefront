import { useState } from "react";
import { Link } from "react-router-dom";
import CartButton from "./CartButton";
import ViewToggler from "./ViewToggler";
import Logo from './Svgs';
import { IoIosAddCircleOutline } from "react-icons/io"
import CreateNewProductPopup from "./CreateNewProductPopup";


const Navbar = () => {
  const [visibleModal, setVisibleModal] = useState(false)

  const handleModal = () => {
    console.log('Here')
    visibleModal ? setVisibleModal(false) : setVisibleModal(true)
}


  return (
    <>
    <CreateNewProductPopup show={visibleModal} handler={handleModal} />
    <>
      <nav className="bg-base">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between">

            <div className="flex space-x-4">
              <div>
                <Link to={{ pathname: "/" }} className="flex items-center py-5 px-2 text-dark hover:text-gray-900">
                  <Logo />
                  <span className="font-bold ml-6">Storefront</span>
                </Link>
              </div>
              <button className="m-4 addNewBtn flex-row items-center" onClick={() => handleModal()}>
              <IoIosAddCircleOutline size="25" color="#3E4756" />
              <p className="pl-2">Add a new product</p>
              </button>

            </div>

            <div className="flex">
              <div className="md:hidden flex items-center">
                <button className="mobile-menu-button">
                  <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>

              <ViewToggler />
              <Link to={{ pathname: "/cart" }} className="flex items-center" ><CartButton /></Link>
            </div>
          </div>
        </div>

      </nav>
      </>
    </>
  )
}

export default Navbar;