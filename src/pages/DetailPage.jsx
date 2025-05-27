import { useParams, useLocation } from "react-router-dom";
import { fetchById } from "../hooks/useTasks";
import { useState, useEffect, useMemo } from "react";
import useClick from "../hooks/useClick";

export default function DetailPage() {
    const { id } = useParams();
    const location = useLocation();
    const path = location.pathname.split("/")[1];

    const contentType = useMemo(() => {
        if (path.includes("cinemas")) return "film";
        if (path.includes("books")) return "libro";
        if (path.includes("albums")) return "album";
        return "Elemento";
    }, [path]);

    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await fetchById(path, id);
                setData(result);
            } catch (err) {
                console.error(err);
            }
        };
        if (path && id) {
            fetchData();
        }
    }, [path, id]);

    const uniqueId = `${id}`;
    const storageKey = `favourites-${path}`;

    const { onSaveClick, onDeleteClick } = useClick(storageKey, uniqueId, data)

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-2">Dettaglio {contentType} {id}</h1>
            {renderDetails(path, data)}
            <div className="flex justify-center gap-4">
                <button onClick={() => onSaveClick(uniqueId)}
                    className="p-2 shadow-md shadow-gray-400 bg-emerald-700 text-white rounded-xl mt-4 hover:bg-emerald-800 cursor-pointer">
                    Aggiungi ai preferiti
                </button>
                <button onClick={() => onDeleteClick(uniqueId)}
                    className="p-2 shadow-md shadow-gray-400 bg-red-700 text-white rounded-xl mt-4 hover:bg-red-800 cursor-pointer">
                    Rimuovi dai preferiti
                </button>
            </div>

        </div>
    );
}

const renderDetails = (path, data) => {
    if (!data) return null;

    switch (path) {
        case "cinemas":
            return (
                <>
                    <p><strong>Titolo film: </strong>{data.title}</p>
                    <p><strong>Categoria film: </strong>{data.category}</p>
                    <p><strong>Regista: </strong>{data.directory}</p>
                    <p><strong>Durata film: </strong>{data.durata} minuti</p>
                    <p><strong>Genere: </strong>{data.genre}</p>
                    <p><strong>Anno d`uscita: </strong>{data.release_year}</p>
                    <p><strong>Valutazione: </strong>{data.rating}</p>
                </>
            );
        case "books":
            return (
                <>
                    <p><strong>Titolo libro: </strong>{data.title}</p>
                    <p><strong>Categoria libro: </strong>{data.category}</p>
                    <p><strong>Autore: </strong>{data.author}</p>
                    <p><strong>N°pagine: </strong>{data.pages}</p>
                    <p><strong>Genere: </strong>{data.genre}</p>
                    <p><strong>Anno d`uscita: </strong>{data.release_year}</p>
                    <p><strong>Valutazione: </strong>{data.rating}</p>
                </>
            );
        case "albums":
            return (
                <>
                    <p><strong>Titolo album: </strong>{data.title}</p>
                    <p><strong>Categoria album: </strong>{data.category}</p>
                    <p><strong>Artista: </strong>{data.artist}</p>
                    <p><strong>N°Tracce: </strong>{data.n_tracks}</p>
                    <p><strong>Genere: </strong>{data.genre}</p>
                    <p><strong>Anno d`uscita: </strong>{data.release_year}</p>
                    <p><strong>Valutazione: </strong>{data.rating}</p>
                </>
            );
        default:
            return <p>Dati non disponibili</p>;
    }
};