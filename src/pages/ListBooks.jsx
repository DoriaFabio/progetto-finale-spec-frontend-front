import { GlobalContext } from "../context/globalContext"
import { useContext, useMemo, useState } from "react"
import TableRow from "../components/TableRow";
import Search from "../components/Search";
import FilterCategory from "../components/FilterCategory";
import { HiSortAscending, HiSortDescending } from "react-icons/hi"; //? Icone per l'ordinamento
import useSort from "../hooks/useSort";

export default function ListBooks() {
  const { books } = useContext(GlobalContext); //? Ottiene la lista dei libri dal contesto globale
  console.log(books);
  const [searchBook, setSearchBook] = useState(""); //? Stato ricerca titolo
  const [selectedCategory, setSelectedCategory] = useState(""); //? Stato filtro categoria
  const { sortBy, sortOrder, handleOrder, filterSort } = useSort(null);
  //? Seleziona l'icona da mostrare a seconda dell'ordine attuale
  const sortIcon = sortOrder === 1 ? <HiSortDescending className="inline" /> : <HiSortAscending className="inline" />;

  //* Calcola la lista dei libri filtrata e ordinata
  const filteredBook = useMemo(() => {
    return [...books].filter(b => b.title.toLowerCase().includes(searchBook.toLowerCase()) &&
      (selectedCategory === "" || selectedCategory === b.category)).sort(filterSort)
  }, [searchBook, books, selectedCategory, filterSort]);

  return (
    <div className="flex flex-col items-center">
      <h1 className="font-bold text-[30px] my-5">Lista libri</h1>
      {/* Barra di ricerca e filtro per categoria */}
      <div className="grid grid-cols-2 gap-5 mb-5">
        <Search onSearch={setSearchBook} />
        <FilterCategory data={books} onFilter={setSelectedCategory} />
      </div>
      {/* Tabella dei libri */}
      <table className="border my-2 shadow-2xl">
        <thead className="bg-green-800 text-white">
          <tr>
            <th className="border py-1 border-black cursor-pointer" onClick={() => handleOrder("title")}>
              Titolo {sortBy === "title" && sortIcon} {/* Colonna per ordinare per titolo */}
            </th>
            <th className="border py-1 border-black px-3 cursor-pointer" onClick={() => handleOrder("category")}>
              Categoria {sortBy === "category" && sortIcon} {/* Colonna per ordinare per categoria */}
            </th>
          </tr>
        </thead>
        {/* Se ci sono libri filtrati, mostra le righe. Se non ci sono risultati, mostra un messaggio */}
        <tbody>
          {filteredBook.length > 0 ? filteredBook.map((book) => (
            <TableRow key={book.id} data={book} path="books" />
          )) : <tr><td colSpan="3" className="text-center">Nessun libro</td></tr>}
        </tbody>
      </table>
    </div>
  )
}
