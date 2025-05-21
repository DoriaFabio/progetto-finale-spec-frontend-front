import { GlobalContext } from "../context/globalContext"
import { useContext } from "react"
import TableRow from "../components/TableRow";

export default function ListBooks() {
  const { books } = useContext(GlobalContext);
  console.log(books);
  return (
    <div className="my-5 flex flex-col items-center">
      <h1 className="font-bold text-[30px] mb-10">Lista libri</h1>
      <table className="border my-2 shadow-2xl">
        <thead className="bg-blue-900 text-white hover:bg-blue-800 transition duration-500 ease-in-out">
          <tr>
            <th className="border py-1 border-black cursor-pointer">Titolo</th>
            <th className="border py-1 border-black px-3 cursor-pointer">Categoria</th>
          </tr>
        </thead>
        <tbody>
          {books.length > 0 ? books.map((book, index) => (
            <TableRow key={index} data={book}/>
          )) : <tr><td colSpan="3">Nessun libro</td></tr>}
        </tbody>
      </table>
    </div>
  )
}
