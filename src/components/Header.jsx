import { NavLink } from "react-router-dom"
import { FaHouse } from "react-icons/fa6";

export default function Header() {
    return (
        <header className='bg-emerald-800 text-white p-5'>
            <NavLink to="/" className="mx-1 sm:mx-3 my-2 hover:bg-emerald-900 p-3 rounded-xl text-[13px] sm:text-[16px]">
                <FaHouse className="inline-block" />
            </NavLink>
            <NavLink to="/cinemas" className="mx-1 sm:mx-3 my-2 hover:bg-emerald-900 p-3 rounded-xl text-[13px] sm:text-[16px]">
                Lista film
            </NavLink>
            <NavLink to="/books" className="mx-1 sm:mx-3 my-2 hover:bg-emerald-900 p-3 rounded-xl text-[13px] sm:text-[16px]">
                Lista libri
            </NavLink>
            <NavLink to="/albums" className="mx-1 sm:mx-3 my-2 hover:bg-emerald-900 p-3 rounded-xl text-[13px] sm:text-[16px]">
                Lista album
            </NavLink>
        </header>
    )
}