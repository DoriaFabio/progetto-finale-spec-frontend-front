import { useState, useEffect } from 'react';
import { fetchById } from '../hooks/useTasks';

export default function Sidebar() {
    const [favouritesCinemas, setFavouritesCinemas] = useState([]);
    const [favouritesAlbums, setFavouritesAlbums] = useState([]);
    const [favouritesBooks, setFavouritesBooks] = useState([]);

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

    useEffect(() => {
        loadFav();
    }, []);


    return (
        <div className="p-4 absolute top-0 right-0 border h-[calc(100vh-60px)]">
            <h2 className="text-center font-bold text-base my-5">Film preferiti</h2>
            {favouritesCinemas.length > 0 ? (
                <ul className="space-y-2">
                    {favouritesCinemas.map((movie) => (
                        <li key={movie.id} className="p-2 border rounded shadow">
                            {movie.title} - {movie.directory}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Non hai ancora aggiunto film preferiti.</p>
            )}
            <h2 className="text-center font-bold text-base my-5">Libri preferiti</h2>
            {favouritesBooks.length > 0 ? (
                <ul className="space-y-2">
                    {favouritesBooks.map((book) => (
                        <li key={book.id} className="p-2 border rounded shadow">
                            {book.title} - {book.author}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Non hai ancora aggiunto libri preferiti.</p>
            )}
            <h2 className="text-center font-bold text-base my-5">Album preferiti</h2>
            {favouritesAlbums.length > 0 ? (
                <ul className="space-y-2">
                    {favouritesAlbums.map((album) => (
                        <li key={album.id} className="p-2 border rounded shadow">
                            {album.title} - {album.artist}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Non hai ancora aggiunto album preferiti.</p>
            )}
        </div>
    );
}
