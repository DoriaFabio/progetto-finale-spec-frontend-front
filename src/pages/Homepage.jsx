import { NavLink } from "react-router-dom"

export default function Homepage() {
    return (
        <div className="flex flex-col items-center">
            <h1 className="mt-5 font-bold text-[30px] mb-10">Homepage</h1>
            <div>
                <NavLink to="/cinemas" className="mx-1 sm:mx-3 my-2 hover:bg-emerald-700 p-3 rounded-xl text-[13px] sm:text-[16px] transition-all duration-500">
                    Lista film
                </NavLink>
                <NavLink to="/books" className="mx-1 sm:mx-3 my-2 hover:bg-emerald-700 p-3 rounded-xl text-[13px] sm:text-[16px] transition-all duration-500">
                    Lista libri
                </NavLink>
                <NavLink to="/albums" className="mx-1 sm:mx-3 my-2 hover:bg-emerald-700 p-3 rounded-xl text-[13px] sm:text-[16px] transition-all duration-500">
                    Lista album
                </NavLink>
            </div>
        </div>
    )
}