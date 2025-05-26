import { GlobalContext } from "../context/globalContext"
import { useContext, useState, useMemo } from "react"
import TableRow from "../components/TableRow";
import Search from "../components/Search";
import FilterCategory from "../components/filterCategory";
import { HiSortAscending, HiSortDescending } from "react-icons/hi";
import useSort from "../hooks/useSort";

export default function ListAlbum() {
  const { albums } = useContext(GlobalContext);
  console.log(albums);
  const [searchAlbum, setSearchAlbum] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const {sortBy, sortOrder, handleOrder, filterSort} = useSort("title");
  const sortIcon = sortOrder === 1 ? <HiSortDescending className="inline" /> : <HiSortAscending className="inline" />;

  const filteredAlbum = useMemo(() => {
    return [...albums].filter(a => a.title.toLowerCase().includes(searchAlbum.toLowerCase()) &&
      (selectedCategory === "" || a.category === selectedCategory)).sort(filterSort);
  }, [albums, searchAlbum, selectedCategory, filterSort]);

  return (
    <div className="my-5 flex flex-col items-center">
      <h1 className="font-bold text-[30px] mb-5">Lista album</h1>
      <div className="grid grid-cols-2 gap-5 mb-5">
        <Search onSearch={setSearchAlbum} />
        <FilterCategory data={albums} onFilter={setSelectedCategory} />
      </div>
      <table className="border shadow-2xl">
        <thead className="bg-green-800 text-white transition duration-500 ease-in-out">
          <tr>
            <th className="border py-1 border-black cursor-pointer" onClick={() => handleOrder("title")}>Titolo {sortBy === "title" && sortIcon}</th>
            <th className="border py-1 border-black px-3 cursor-pointer" onClick={() => handleOrder("category")}>Categoria {sortBy === "category" && sortIcon}</th>
          </tr>
        </thead>
        <tbody>
          {filteredAlbum.length > 0 ? filteredAlbum.map((music) => (
            <TableRow key={music.id} data={music} path="albums" />
          )) : <tr><td colSpan="3">Nessun album</td></tr>}
        </tbody>
      </table>
    </div>
  )
}