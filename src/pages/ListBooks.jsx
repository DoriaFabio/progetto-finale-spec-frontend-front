import { GlobalContext } from "../context/globalContext"
import { useContext, useMemo, useState } from "react"
import TableRow from "../components/TableRow";
import Search from "../components/Search";
import FilterCategory from "../components/filterCategory";

export default function ListBooks() {
  const { books } = useContext(GlobalContext);
  console.log(books);
  const [searchBook, setSearchBook] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("")
  const filteredBook = useMemo(() => {
    return [...books].filter(b => b.title.toLowerCase().includes(searchBook.toLowerCase()) &&
      (selectedCategory === "" || selectedCategory === b.category))
  }, [searchBook, books, selectedCategory]);

  return (
    <div className="my-5 flex flex-col items-center">
      <h1 className="font-bold text-[30px] mb-5">Lista libri</h1>
      <div className="grid grid-cols-2 gap-5 mb-5">
        <Search onSearch={setSearchBook} />
        <FilterCategory data={books} onFilter={setSelectedCategory} />
      </div>
      <table className="border my-2 shadow-2xl">
        <thead className="bg-green-800 text-white">
          <tr>
            <th className="border py-1 border-black cursor-pointer">Titolo</th>
            <th className="border py-1 border-black px-3 cursor-pointer">Categoria</th>
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
