import { useState, useEffect } from 'react';
import { fetchById } from '../hooks/useTasks';

export default function Comparator() {
    const [compCinemas, setCompCinemas] = useState([]);
    const [compBooks, setCompBooks] = useState([]);
    const [compAlbums, setCompAlbums] = useState([]);

    const loadType = async (type, setState) => {
        const saved = localStorage.getItem(`comparators-${type}`);
        const ids = saved ? JSON.parse(saved) : [];
        const results = await Promise.all(ids.map(id => fetchById(type, id)));
        setState(results);
    };

    const loadComp = async () => {
        try {
            await loadType("cinemas", setCompCinemas);
            await loadType("albums", setCompAlbums);
            await loadType("books", setCompBooks);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        loadComp();
    }, []);

    return (
        <div className="flex flex-col items-center">
            <h1 className='font-bold my-5 text-xl'>Comparatore</h1>
            <h2 className='font-bold text-lg'>Sezione film</h2>
            {compCinemas.length > 0 ? (
                <ul className='grid grid-cols-2 gap-4'>
                    {compCinemas.map((movie) => (
                        <li key={movie.id} className="p-2 border rounded shadow overflow-ellipsis overflow-hidden text-nowrap">
                            <p><strong>Titolo:</strong> {movie.title}</p>
                            <p><strong>Regista:</strong> {movie.directory}</p>
                            <p><strong>Anno di uscita:</strong> {movie.release_year}</p>
                            <p><strong>Durata:</strong> {movie.durata} minuti</p>
                            <p><strong>Valutazione:</strong> {movie.rating}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Non hai ancora aggiunto film al comparatore</p>
            )}
            <h2 className='font-bold text-lg'>Sezione libri</h2>
            {compBooks.length > 0 ? (
                <ul className='grid grid-cols-2 gap-4'>
                    {compBooks.map((book) => (
                        <li key={book.id} className="p-2 border rounded shadow overflow-ellipsis overflow-hidden text-nowrap">
                            <p><strong>Titolo:</strong> {book.title}</p>
                            <p><strong>Autore:</strong> {book.author}</p>
                            <p><strong>Anno di uscita:</strong> {book.release_year}</p>
                            <p><strong>N° pagine:</strong> {book.pages}</p>
                            <p><strong>Valutazione:</strong> {book.rating}</p>
                        </li>
                    ))}
                </ul>

            ) : (
                <p>Non hai ancora aggiunto libri al comparatore</p>
            )}
            <h2 className='font-bold text-lg'>Sezione album</h2>
            {compAlbums.length > 0 ? (
                <ul className='grid grid-cols-2 gap-4'>
                    {compAlbums.map((album) => (
                        <li key={album.id} className="p-2 border rounded shadow overflow-ellipsis overflow-hidden text-nowrap">
                            <p><strong>Titolo:</strong> {album.title}</p>
                            <p><strong>Artista:</strong> {album.artist}</p>
                            <p><strong>Anno di uscita:</strong> {album.release_year}</p>
                            <p><strong>N° tracce:</strong> {album.n_tracks}</p>
                            <p> <strong>Valutazione:</strong> {album.rating}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Non hai ancora aggiunto album al comparatore</p>
            )}
        </div>
    );
}
