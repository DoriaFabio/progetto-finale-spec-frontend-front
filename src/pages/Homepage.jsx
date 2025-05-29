import { NavLink } from "react-router-dom"

export default function Homepage() {

    return (
        <div className="flex flex-col items-center">
            <h1 className="mt-5 font-bold text-[30px] mb-10">Homepage</h1>
            <div className="flex">
                <NavLink to="/cinemas" className="group mx-1 sm:mx-3 my-2 relative overflow-hidden shadow-[-10px_5px_26px_rgba(0,0,0,0.25)]">
                    <img src="./cinema.jpg" alt="cinema" className="w-58 h-auto" />
                    <div className="absolute inset-0 bg-[#00000091] flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <p className="text-white text-[24px]">Lista film</p>
                    </div>
                </NavLink>
                <NavLink to="/books" className="group mx-1 sm:mx-3 my-2 relative overflow-hidden shadow-[-10px_5px_26px_rgba(0,0,0,0.25)]">
                    <img src="./libri.jpg" alt="libri" className="w-58 h-auto" />
                    <div className="absolute inset-0 bg-[#00000091] flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <p className="text-white text-[24px]">Lista libri</p>
                    </div>
                </NavLink>
                <NavLink to="/albums" className="group mx-1 sm:mx-3 my-2 relative overflow-hidden shadow-[-10px_5px_26px_rgba(0,0,0,0.25)]">
                    <img src="./musica.jpg" alt="album" className="w-58 h-auto" />
                    <div className="absolute inset-0 bg-[#00000091] flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <p className="text-white text-[24px]">Lista album</p>
                    </div>
                </NavLink>
            </div>
        </div>
    )
}