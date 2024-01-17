import React from "react";
import navbar_logo from "../../../assets/images/navbar_logo.png";
import "@fontsource/poppins";
import { Link } from "react-router-dom";


const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const toggleMenu =() =>{
        setIsMenuOpen(!isMenuOpen);
    }

    return (
        <div className="fixed top-0 start-0 z-10 bg-white shadow-md w-full">
            <nav className="navbar navbar-expand-lg navbar-light flex justify-between items-center h-20 max-w-screen-2xl mx-auto px-5 md:px-20 ">
                <Link className="navbar-brand" to="/">
                    <img src={navbar_logo} alt="gdsc_logo" width="100" height="100" className="align-middle min-w-full" />
                </Link>
                <button onClick={toggleMenu} class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"  aria-expanded={isMenuOpen}>
                    <span class="sr-only">Open main menu</span>
                    <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
                    </svg>
                </button>
                    <ul className={`${isMenuOpen ? "block":"hidden"} bg-white w-full md:w-auto top-20 left-0 md:flex md:items-center z-[1] md:z-auto absolute md:static py-2 md:py-0 font-bold font-poppins border-y-2 md:border-none`} >
                        <li className="px-5 md:px-12 opacity-75 " aria-current="page" onClick={toggleMenu}><Link to="/">Shorten a URL</Link></li>
                        <li className=" px-5 md:px-5 py-3 md:bg-red-500 md:hover:bg-red-700 text-base opacity-75 md:opacity-100 md:text-white rounded-xl min-w-max" onClick={toggleMenu}><Link to="/sign-in">Sign In</Link></li>
                    </ul>
            </nav>
        </div>
    );
};

export default Navbar;