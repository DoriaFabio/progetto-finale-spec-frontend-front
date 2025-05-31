import { useState, useEffect } from 'react';
import { fetchById } from '../hooks/useTasks';
import { Link } from 'react-router-dom';

export default function Sidebar() {
    //* Stati separati per ogni tipo di preferiti
    const [favouritesCinemas, setFavouritesCinemas] = useState([]);
    const [favouritesAlbums, setFavouritesAlbums] = useState([]);
    const [favouritesBooks, setFavouritesBooks] = useState([]);

    //* Carica i preferiti di un determinato tipo da localStorage e poi recupera i dettagli completi
    const loadType = async (type, setState) => {
        const saved = localStorage.getItem(`favourites-${type}`);
        const ids = saved ? JSON.parse(saved) : [];
        const results = await Promise.all(ids.map(id => fetchById(type, id)));
        setState(results);
    };

    //* Carica tutti i tipi di preferiti
    const loadFav = async () => {
        try {
            await loadType("cinemas", setFavouritesCinemas);
            await loadType("albums", setFavouritesAlbums);
            await loadType("books", setFavouritesBooks);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        loadFav(); //? Carica inizialmente i preferiti
        const handler = () => loadFav(); // aggiorna preferiti all'evento
        window.addEventListener("favouritesChanged", handler);
        return () => window.removeEventListener("favouritesChanged", handler);
    }, []);

    return (
        <div className="p-4 fixed top-[60px] right-0 bg-[#5b635d8a] h-[calc(100vh-60px)] w-[15%] shadow-[-15px_0px_26px_rgba(0,0,0,0.25)] z-100 overflow-y-auto">
            {/* Sezione film preferiti */}
            <h2 className="text-center font-bold text-base my-5">Film preferiti</h2>
            {favouritesCinemas.length > 0 ? (
                <ul className="space-y-2">
                    {favouritesCinemas.map((movie) => (
                        <li key={movie.id} className="p-2 border rounded shadow overflow-ellipsis overflow-hidden text-nowrap">
                            <Link to={`/cinemas/${movie.id}`}>{movie.title} - {movie.directory}</Link>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className='text-sm'>Non hai ancora aggiunto film preferiti.</p>
            )}
            {/* Sezione libri preferiti */}
            <h2 className="text-center font-bold text-base my-5">Libri preferiti</h2>
            {favouritesBooks.length > 0 ? (
                <ul className="space-y-2">
                    {favouritesBooks.map((book) => (
                        <li key={book.id} className="p-2 border rounded shadow overflow-ellipsis overflow-hidden text-nowrap">
                            <Link to={`/books/${book.id}`}>{book.title} - {book.author}</Link>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className='text-sm'>Non hai ancora aggiunto libri preferiti.</p>
            )}
            {/* Sezione album preferiti */}
            <h2 className="text-center font-bold text-base my-5">Album preferiti</h2>
            {favouritesAlbums.length > 0 ? (
                <ul className="space-y-2">
                    {favouritesAlbums.map((album) => (
                        <li key={album.id} className="p-2 border rounded shadow overflow-ellipsis overflow-hidden text-nowrap">
                            <Link to={`/albums/${album.id}`}>{album.title} - {album.artist}</Link>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className='text-sm'>Non hai ancora aggiunto album preferiti.</p>
            )}
        </div>
    );
}
