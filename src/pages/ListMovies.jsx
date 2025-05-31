import { GlobalContext } from "../context/globalContext"
import { useContext, useState, useMemo } from "react"
import TableRow from "../components/TableRow";
import Search from "../components/Search";
import FilterCategory from "../components/FilterCategory";
import { HiSortAscending, HiSortDescending } from "react-icons/hi"; //? Icone per l'ordinamento 
import useSort from "../hooks/useSort";

export default function ListMovies() {
  const { cinemas } = useContext(GlobalContext); //? Ottiene la lista dei film dal contesto globale
  console.log(cinemas);
  const [searchMovies, setSearchMovies] = useState(""); //? Stato ricerca titolo
  const [selectedCategory, setSelectedCategory] = useState(""); //? Stato filtro categoria
  const { sortBy, sortOrder, handleOrder, filterSort } = useSort(null);
  //? Seleziona l'icona da mostrare a seconda dell'ordine attuale
  const sortIcon = sortOrder === 1 ? <HiSortAscending className="inline" /> : <HiSortDescending className="inline" />

  //* Calcola la lista dei film filtrata e ordinata
  const filteredMovies = useMemo(() => {
    return [...cinemas].filter(m => m.title.toLowerCase().includes(searchMovies.toLowerCase()) &&
      (selectedCategory === "" || selectedCategory === m.category)).sort(filterSort);
  }, [cinemas, searchMovies, selectedCategory, filterSort]);

  return (
    <div className="flex flex-col items-center">
      <h1 className="font-bold text-[30px] my-5">Lista film</h1>
      {/* Barra di ricerca e filtro per categoria */}
      <div className="grid grid-cols-2 gap-5 mb-5">
        <Search onSearch={setSearchMovies} />
        <FilterCategory data={cinemas} onFilter={setSelectedCategory} />
      </div>
      {/* Tabella dei film */}
      <table className="border my-2 shadow-2xl">
        <thead className="bg-green-800 text-white transition duration-500 ease-in-out">
          <tr>
            <th className="border py-1 border-black cursor-pointer" onClick={() => handleOrder("title")}>
              Titolo {sortBy === "title" && sortIcon} {/* Colonna per ordinare per titolo */}
            </th>
            <th className="border py-1 border-black px-3 cursor-pointer" onClick={() => handleOrder("category")}>
              Categoria {sortBy === "category" && sortIcon} {/* Colonna per ordinare per categoria */}
            </th>
          </tr>
        </thead>
        {/* Se ci sono film filtrati, mostra le righe. Se non ci sono risultati, mostra un messaggio */}
        <tbody>
          {filteredMovies.length > 0 ? filteredMovies.map((movie) => (
            <TableRow key={movie.id} data={movie} path="cinemas" />
          )) : <tr><td colSpan="3" className="text-center">Nessun film</td></tr>}
        </tbody>
      </table>
    </div>
  )
}