import { GlobalContext } from "../context/globalContext"
import { useState, useContext } from "react"

export default function ListAlbum() {
  const { albums } = useContext(GlobalContext);
  console.log(albums);
  return (
    <div className="my-5 flex flex-col items-center">
      <h1 className="font-bold text-[30px] mb-10">Lista album</h1>
      <table className="border my-2 shadow-2xl">
        <thead className="bg-blue-900 text-white hover:bg-blue-800 transition duration-500 ease-in-out">
          <tr>
            <th className="border py-1 border-black cursor-pointer">Titolo</th>
            <th className="border py-1 border-black px-3 cursor-pointer">Categoria</th>
          </tr>
        </thead>
        <tbody>
          {albums && albums.map((music, index) => (
            <tr key={index}>
              <td className="border py-1 px-2">{music.title}</td>
              <td className="border py-1 px-2">{music.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}