import { GlobalContext } from "../context/globalContext"
import { useContext, useState, useMemo } from "react"
import TableRow from "../components/TableRow";
import Search from "../components/Search";
import FilterCategory from "../components/filterCategory";
import { HiSortAscending, HiSortDescending } from "react-icons/hi";
import useSort from "../hooks/useSort";

export default function ListMovies() {
  const { cinemas } = useContext(GlobalContext);
  console.log(cinemas);
  const [searchMovies, setSearchMovies] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const { sortBy, sortOrder, handleOrder, filterSort } = useSort("title");
  const sortIcon = sortOrder === 1 ? <HiSortAscending className="inline" /> : <HiSortDescending className="inline" />

  const filteredMovies = useMemo(() => {
    return [...cinemas].filter(m => m.title.toLowerCase().includes(searchMovies.toLowerCase()) &&
      (selectedCategory === "" || selectedCategory === m.category)).sort(filterSort);
  }, [cinemas, searchMovies, selectedCategory, filterSort]);

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
            <th className="border py-1 border-black cursor-pointer" onClick={() => handleOrder("title")}>Titolo {sortBy === "title" && sortIcon}</th>
            <th className="border py-1 border-black px-3 cursor-pointer" onClick={() => handleOrder("category")}>Categoria {sortBy === "category" && sortIcon}</th>
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