import { GlobalContext } from "../context/globalContext"
import { useContext, useState, useMemo } from "react"
import TableRow from "../components/TableRow";
import Search from "../components/Search";

export default function ListAlbum() {
  const { albums } = useContext(GlobalContext);
  console.log(albums);
  const [searchAlbum, setSearchAlbum] = useState("");
  const filteredAlbum = useMemo(() => {
    return [...albums].filter(a => a.title.toLowerCase().includes(searchAlbum.toLowerCase()))
  }, [albums, searchAlbum]);

  return (
    <div className="my-5 flex flex-col items-center">
      <h1 className="font-bold text-[30px] mb-5">Lista album</h1>
      <Search onSearch={setSearchAlbum}/>
      <table className="border my-2 shadow-2xl">
        <thead className="bg-green-800 text-white transition duration-500 ease-in-out">
          <tr>
            <th className="border py-1 border-black cursor-pointer">Titolo</th>
            <th className="border py-1 border-black px-3 cursor-pointer">Categoria</th>
          </tr>
        </thead>
        <tbody>
          {filteredAlbum.length > 0 ? filteredAlbum.map((music, index) => (
            <TableRow key={index} data={music} />
          )) : <tr><td colSpan="3">Nessun album</td></tr>}
        </tbody>
      </table>
    </div>
  )
}