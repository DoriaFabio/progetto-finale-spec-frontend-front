import { GlobalContext } from "../context/globalContext"
import { useContext, useMemo, useState } from "react"
import TableRow from "../components/TableRow";
import Search from "../components/Search";
import FilterCategory from "../components/filterCategory";
import { HiSortAscending, HiSortDescending } from "react-icons/hi";
import useSort from "../hooks/useSort";

export default function ListBooks() {
  const { books } = useContext(GlobalContext);
  console.log(books);
  const [searchBook, setSearchBook] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const { sortBy, sortOrder, handleOrder, filterSort } = useSort("title");
  const sortIcon = sortOrder === 1 ? <HiSortDescending className="inline" /> : <HiSortAscending className="inline" />;

  const filteredBook = useMemo(() => {
    return [...books].filter(b => b.title.toLowerCase().includes(searchBook.toLowerCase()) &&
      (selectedCategory === "" || selectedCategory === b.category)).sort(filterSort)
  }, [searchBook, books, selectedCategory, filterSort]);

  return (
    <div className="flex flex-col items-center">
      <h1 className="font-bold text-[30px] my-5">Lista libri</h1>
      <div className="grid grid-cols-2 gap-5 mb-5">
        <Search onSearch={setSearchBook} />
        <FilterCategory data={books} onFilter={setSelectedCategory} />
      </div>
      <table className="border my-2 shadow-2xl">
        <thead className="bg-green-800 text-white">
          <tr>
            <th className="border py-1 border-black cursor-pointer" onClick={() => handleOrder("title")}>Titolo {sortBy === "title" && sortIcon}</th>
            <th className="border py-1 border-black px-3 cursor-pointer" onClick={() => handleOrder("category")}>Categoria {sortBy === "category" && sortIcon}</th>
          </tr>
        </thead>
        <tbody>
          {filteredBook.length > 0 ? filteredBook.map((book) => (
            <TableRow key={book.id} data={book} path="books" />
          )) : <tr><td colSpan="3">Nessun libro</td></tr>}
        </tbody>
      </table>
    </div>
  )
}
