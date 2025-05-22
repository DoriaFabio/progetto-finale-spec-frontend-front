import { GlobalContext } from "../context/globalContext"
import { useContext, useState, useMemo } from "react"
import TableRow from "../components/TableRow";
import Search from "../components/Search";

export default function ListMovies() {
  const { cinemas } = useContext(GlobalContext);
  console.log(cinemas);
  const [searchMovies, setSearchMovies] = useState("");
  const filteredMovies = useMemo(() => {
    return [...cinemas].filter(m => m.title.toLowerCase().includes(searchMovies.toLowerCase()));
  }, [cinemas, searchMovies]);

  return (
    <div className="my-5 flex flex-col items-center">
      <h1 className="font-bold text-[30px] mb-5">Lista film</h1>
      <Search onSearch={setSearchMovies} />
      <table className="border my-2 shadow-2xl">
        <thead className="bg-green-800 text-white transition duration-500 ease-in-out">
          <tr>
            <th className="border py-1 border-black cursor-pointer">Titolo</th>
            <th className="border py-1 border-black px-3 cursor-pointer">Categoria</th>
          </tr>
        </thead>
        <tbody>
          {filteredMovies.length > 0 ? filteredMovies.map((movie, index) => (
            <TableRow key={index} data={movie} />
          )) : <tr><td colSpan="3">Nessun film</td></tr>}
        </tbody>
      </table>
    </div>
  )
}