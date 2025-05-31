import { GlobalContext } from "../context/globalContext"
import { useContext, useState, useMemo } from "react"
import TableRow from "../components/TableRow";
import Search from "../components/Search";
import FilterCategory from "../components/FilterCategory";
import { HiSortAscending, HiSortDescending } from "react-icons/hi"; //? Icone per l'ordinamento
import useSort from "../hooks/useSort";

export default function ListAlbum() {
  const { albums } = useContext(GlobalContext); //? Ottiene la lista degli album dal contesto globale
  console.log(albums);
  const [searchAlbum, setSearchAlbum] = useState(""); //? Stato ricerca titolo
  const [selectedCategory, setSelectedCategory] = useState(""); //? Stato filtro categoria
  const { sortBy, sortOrder, handleOrder, filterSort } = useSort(null);
  //? Seleziona l'icona da mostrare a seconda dell'ordine attuale
  const sortIcon = sortOrder === 1 ? <HiSortDescending className="inline" /> : <HiSortAscending className="inline" />;

  //* Calcola la lista degli album filtrata e ordinata
  const filteredAlbum = useMemo(() => {
    return [...albums].filter(a => a.title.toLowerCase().includes(searchAlbum.toLowerCase()) &&
      (selectedCategory === "" || a.category === selectedCategory)).sort(filterSort);
  }, [albums, searchAlbum, selectedCategory, filterSort]);

  return (
    <div className="flex flex-col items-center">
      <h1 className="font-bold text-[30px] my-5">Lista album</h1>
      {/* Barra di ricerca e filtro per categoria */}
      <div className="grid grid-cols-2 gap-5 mb-5">
        <Search onSearch={setSearchAlbum} />
        <FilterCategory data={albums} onFilter={setSelectedCategory} />
      </div>
      {/* Tabella degli album */}
      <table className="border shadow-2xl">
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
        {/* Se ci sono album filtrati, mostra le righe. Se non ci sono risultati, mostra un messaggio */}
        <tbody>
          {filteredAlbum.length > 0 ? filteredAlbum.map((music) => (
            <TableRow key={music.id} data={music} path="albums" />
          )) : <tr><td colSpan="3" className="text-center">Nessun album</td></tr>}
        </tbody>
      </table>
    </div>
  )
}