import { NavLink } from "react-router-dom"
import { FaHouse } from "react-icons/fa6";

export default function Header() {
    return (
        <header className='bg-emerald-800 text-white h-15 flex justify-items-start items-center fixed top-0 left-0 right-0'>
            <NavLink to="/" className="sm:mx-3 hover:bg-emerald-900 p-3 rounded-xl text-[13px] sm:text-[16px]">
                <FaHouse className="inline-block" />
            </NavLink>
            <NavLink to="/cinemas" className="sm:mx-3 hover:bg-emerald-900 p-3 rounded-xl text-[10px] sm:text-[16px]">
                Lista film
            </NavLink>
            <NavLink to="/books" className="sm:mx-3 hover:bg-emerald-900 p-3 rounded-xl text-[10px] sm:text-[16px]">
                Lista libri
            </NavLink>
            <NavLink to="/albums" className="sm:mx-3 hover:bg-emerald-900 p-3 rounded-xl text-[10px] sm:text-[16px]">
                Lista album
            </NavLink>
            <NavLink to="/comparators" className="sm:mx-3 hover:bg-emerald-900 p-3 rounded-xl text-[10px] sm:text-[16px]">
                Comparatore
            </NavLink>
        </header>
    )
}