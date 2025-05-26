import { GlobalContext } from "../context/globalContext"
import { useContext, useState, useMemo } from "react"
import TableRow from "../components/TableRow";
import Search from "../components/Search";
import FilterCategory from "../components/filterCategory";

export default function ListMovies() {
  const { cinemas } = useContext(GlobalContext);
  console.log(cinemas);
  const [searchMovies, setSearchMovies] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const filteredMovies = useMemo(() => {
    return [...cinemas].filter(m => m.title.toLowerCase().includes(searchMovies.toLowerCase()) &&
      (selectedCategory === "" || selectedCategory === m.category));
  }, [cinemas, searchMovies, selectedCategory]);

  return (
    <div className="my-5 flex flex-col items-center">
      <h1 className="font-bold text-[30px] mb-5">Lista film</h1>
      <div className="grid grid-cols-2 gap-5 mb-5">
        <Search onSearch={setSearchMovies} />
        <FilterCategory data={cinemas} onFilter={setSelectedCategory} />
      </div>
      <table className="border my-2 shadow-2xl">
        <thead className="bg-green-800 text-white transition duration-500 ease-in-out">
          <tr>
            <th className="border py-1 border-black cursor-pointer">Titolo</th>
            <th className="border py-1 border-black px-3 cursor-pointer">Categoria</th>
          </tr>
        </thead>
        <tbody>
          {filteredMovies.length > 0 ? filteredMovies.map((movie) => (
            <TableRow key={movie.id} data={movie} path="cinemas" />
          )) : <tr><td colSpan="3">Nessun film</td></tr>}
        </tbody>
      </table>
    </div>
  )
}