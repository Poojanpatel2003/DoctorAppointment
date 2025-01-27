import { NavLink } from 'react-router-dom';
import {assets} from "../assets/assets_frontend/assets.js"
const Navbar = () => {
    return (
        <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400'>
            <img className='w-44 cursor-pointer' src={assets.logo} alt="" />
            <ul className='hidden md:flex items-start gap-6 font-medium'>
                <NavLink>
                    <li className='py-1'>Home</li>
                    <hr className="border-none outline-none h-0.5 bg-[#5f6FFF]  m-auto" />
                </NavLink>
                <NavLink>
                    <li className='py-1'>All Doctors</li>
                    <hr className="border-none outline-none h-0.5 bg-[#5f6FFF] m-auto" />
                </NavLink>
                <NavLink>
                    <li className='py-1'>About</li>
                    <hr className="border-none outline-none h-0.5 bg-[#5f6FFF]  m-auto" />
                </NavLink>
                <NavLink>
                    <li className='py-1'>Contact</li>
                    <hr className="border-none outline-none h-0.5 bg-[#5f6FFF]  m-auto" />
                </NavLink>
            </ul>
            <div>
                <button>Create account</button>
            </div>
        </div>
    );
}

export default Navbar;
