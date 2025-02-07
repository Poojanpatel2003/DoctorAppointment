import { NavLink, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets_frontend/assets.js";
import { useState } from "react";

const Navbar = () => {
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);
    const [token, setToken] = useState(true);
    const [showDropdown, setShowDropdown] = useState(false);  // Dropdown state

    return (
        <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400 relative">
            <img onClick={() => navigate('/')} className="w-44 cursor-pointer" src={assets.logo} alt="" />
            <ul className="hidden md:flex items-start gap-6 font-medium">
            <NavLink 
    to="/" 
    className={({ isActive }) => 
        `py-1 relative ${isActive ? " after:absolute after:content-[''] after:w-full after:h-[2px] after:bg-blue-600 after:bottom-[-2px] after:left-0" : ""}`
    }
>
    Home
</NavLink>
<NavLink 
    to="/doctors" 
    className={({ isActive }) => 
        `py-1 relative ${isActive ? " after:absolute after:content-[''] after:w-full after:h-[2px] after:bg-blue-600 after:bottom-[-2px] after:left-0" : ""}`
    }
>
    All Doctors
</NavLink>
<NavLink 
    to="/about" 
    className={({ isActive }) => 
        `py-1 relative ${isActive ? " after:absolute after:content-[''] after:w-full after:h-[2px] after:bg-blue-600 after:bottom-[-2px] after:left-0" : ""}`
    }
>
    About
</NavLink>
<NavLink 
    to="/contact" 
    className={({ isActive }) => 
        `py-1 relative ${isActive ? " after:absolute after:content-[''] after:w-full after:h-[2px] after:bg-blue-600 after:bottom-[-2px] after:left-0" : ""}`
    }
>
    Contact
</NavLink>

            </ul>
            <div className="flex items-center gap-4">
                {
                    token ? (
                        <div className="relative">
                            <div 
                                className="flex items-center cursor-pointer gap-2" 
                                onClick={() => setShowDropdown(!showDropdown)}
                            >
                                <img className="w-8 rounded-full" src={assets.profile_pic} alt="" />
                                <img className="w-2.5" src={assets.dropdown_icon} alt="" />
                            </div>
                            {showDropdown && (
                                <div className="absolute top-full right-0 mt-2 text-base font-medium text-gray-600 z-60 bg-white shadow-md rounded-lg p-4 w-40">
                                    <p onClick={() => { navigate('/my-profile'); setShowDropdown(false); }} className='hover:text-black cursor-pointer'>My Profile</p>
                                    <p onClick={() => { navigate('/my-appointments'); setShowDropdown(false); }} className='hover:text-black cursor-pointer'>My Appointment</p>
                                    <p onClick={() => { setToken(false); setShowDropdown(false); }} className='hover:text-black cursor-pointer'>Logout</p>
                                </div>
                            )}
                        </div>
                    ) : (
                        <button onClick={() => navigate('/login')} className="bg-[#5f6FFF] text-white px-8 py-3 rounded-full font-light hidden md:block">Create account</button>
                    )
                }
                <img onClick={() => setShowMenu(true)} className="w-6 md:hidden" src={assets.menu_icon} alt="" />

                {/* Mobile Menu */}
                <div className={`fixed top-0 left-0 w-full h-full z-50 bg-white transition-transform transform ${showMenu ? "translate-x-0" : "-translate-x-full"} md:hidden`}>
                    <div className="flex items-center justify-between px-5 py-6 border-b">
                        <img className="w-36" src={assets.logo} alt="" />
                        <img className="w-7 cursor-pointer" onClick={() => setShowMenu(false)} src={assets.cross_icon} alt="" />
                    </div>
                    <ul className="flex flex-col items-center gap-6 mt-10 text-lg font-medium">
                        <NavLink onClick={() => setShowMenu(false)} to="/" ><p className="px-4 rounded inline-block py-2">HOME</p></NavLink>
                        <NavLink onClick={() => setShowMenu(false)} to="/doctors" > <p className="px-4 rounded inline-block py-2">All DOCTORS</p></NavLink>
                        <NavLink onClick={() => setShowMenu(false)} to="/about" ><p className="px-4 rounded inline-block py-2">ABOUT</p></NavLink>
                        <NavLink onClick={() => setShowMenu(false)} to="/contact" ><p className="px-4 rounded inline-block py-2">CONTACT</p></NavLink>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
