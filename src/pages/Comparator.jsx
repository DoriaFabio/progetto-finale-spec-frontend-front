import { Link } from "react-router-dom";
import { useContext } from "react";
import { GlobalContext } from "../context/globalContext";

export default function Comparator() {
    const { compData } = useContext(GlobalContext);
    const { compCinemas, compBooks, compAlbums, removeComp } = compData;

    return (
        <div className="flex flex-col items-center">
            <h1 className='font-bold my-1 text-xl'>Comparatore</h1>
            <h2 className='font-bold text-lg'>Sezione film</h2>
            {compCinemas.length > 0 ? (
                <div className='grid grid-cols-3 gap-4 my-2'>
                    {compCinemas.map((movie) => (
                        <div key={movie.id} className="p-3 border rounded shadow overflow-hidden w-[200px]">
                            <p className="truncate"><strong>Titolo:</strong> {movie.title}</p>
                            <p className="truncate"><strong>Regista:</strong> {movie.directory}</p>
                            <p><strong>Anno di uscita:</strong> {movie.release_year}</p>
                            <p><strong>Durata:</strong> {movie.durata} minuti</p>
                            <p><strong>Valutazione:</strong> {movie.rating}</p>
                            <div className='flex justify-center gap-3 items-center mt-2'>
                                <button className='bg-red-700 hover:bg-red-800 cursor-pointer text-white p-1 rounded-lg ' onClick={() => removeComp("cinemas", movie.id)}>
                                    Elimina
                                </button>
                                <Link to={`/cinemas/${movie.id}`} className='hover:underline'>Vedi dettaglio</Link>
                            </div>

                        </div>
                    ))}
                </div>
            ) : (
                <p>Non hai ancora aggiunto film al comparatore</p>
            )}
            <h2 className='font-bold text-lg'>Sezione libri</h2>
            {compBooks.length > 0 ? (
                <div className='grid grid-cols-3 gap-4 my-2'>
                    {compBooks.map((book) => (
                        <div key={book.id} className="p-3 border rounded shadow overflow-hidden w-[200px]">
                            <p className="truncate"><strong>Titolo:</strong> {book.title}</p>
                            <p className="truncate"><strong>Autore:</strong> {book.author}</p>
                            <p><strong>Anno di uscita:</strong> {book.release_year}</p>
                            <p><strong>N° pagine:</strong> {book.pages}</p>
                            <p><strong>Valutazione:</strong> {book.rating}</p>
                            <div className='flex justify-center gap-3 items-center mt-2'>
                                <button className='bg-red-700 hover:bg-red-800 text-white p-1 rounded-lg cursor-pointer' onClick={() => removeComp("books", book.id)}>
                                    Elimina
                                </button>
                                <Link to={`/books/${book.id}`} className='hover:underline'>Vedi dettaglio</Link>
                            </div>
                        </div>
                    ))}
                </div>

            ) : (
                <p>Non hai ancora aggiunto libri al comparatore</p>
            )}
            <h2 className='font-bold text-lg'>Sezione album</h2>
            {compAlbums.length > 0 ? (
                <div className='grid grid-cols-3 gap-4 my-2'>
                    {compAlbums.map((album) => (
                        <div key={album.id} className="p-3 border rounded shadow overflow-hidden w-[200px]">
                            <p className="truncate"><strong>Titolo:</strong> {album.title}</p>
                            <p className="truncate"><strong>Artista:</strong> {album.artist}</p>
                            <p><strong>Anno di uscita:</strong> {album.release_year}</p>
                            <p><strong>N° tracce:</strong> {album.n_tracks}</p>
                            <p> <strong>Valutazione:</strong> {album.rating}</p>
                            <div className='flex justify-center gap-3 items-center mt-2'>
                                <button className='bg-red-700 hover:bg-red-800 cursor-pointer text-white p-1 rounded-lg' onClick={() => removeComp("albums", album.id)}>
                                    Elimina
                                </button>
                                <Link to={`/albums/${album.id}`} className='hover:underline'>Vedi dettaglio</Link>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>Non hai ancora aggiunto album al comparatore</p>
            )}
        </div>
    );
}
