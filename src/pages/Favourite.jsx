import { useState, useEffect } from "react";
import { fetchById } from "../hooks/useTasks";
// import { useParams } from "react-router-dom";

export default function FavouritesPage() {
    const [favouritesCinemas, setFavouritesCinemas] = useState([]);
    const [favouritesAlbums, setFavouritesAlbums] = useState([]);
    const [favouritesBooks, setFavouritesBooks] = useState([]);
    // const { id } = useParams();

    useEffect(() => {
        const loadFav = async () => {
            const loadType = async (type, setState) => {
                const saved = localStorage.getItem(`favourites-${type}`);
                const ids = saved ? JSON.parse(saved) : [];
                const results = await Promise.all(ids.map(id => fetchById(type, id)));
                setState(results);
            };

            await loadType("cinemas", setFavouritesCinemas);
            await loadType("albums", setFavouritesAlbums);
            await loadType("books", setFavouritesBooks);
        };
        loadFav();
    }, []);


    return (
        <div className="p-4">
            <h1 className='text-center font-bold text-[30px] my-5'>Preferiti</h1>
            <h2 className="text-center font-bold text-2xl my-5">Film preferiti</h2>
            {favouritesCinemas.length > 0 ? (
                <ul className="space-y-2">
                    {favouritesCinemas.map((movie) => (
                        <li key={movie.id} className="p-2 border rounded shadow">
                            Film preferito: {movie.title}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Non hai ancora aggiunto film preferiti.</p>
            )}
            <h2 className="text-center font-bold text-2xl my-5">Libri preferiti</h2>
            {favouritesBooks.length > 0 ? (
                <ul className="space-y-2">
                    {favouritesBooks.map((book) => (
                        <li key={book.id} className="p-2 border rounded shadow">
                            Libro preferito: {book.title}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Non hai ancora aggiunto libri preferiti.</p>
            )}
            <h2 className="text-center font-bold text-2xl my-5">Album preferiti</h2>
            {favouritesAlbums.length > 0 ? (
                <ul className="space-y-2">
                    {favouritesAlbums.map((album) => (
                        <li key={album.id} className="p-2 border rounded shadow">
                            Album preferito: {album.title}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Non hai ancora aggiunto album preferiti.</p>
            )}
        </div>
    );
}
