import { useParams, useLocation, useNavigate } from "react-router-dom";
import { fetchById } from "../hooks/useTasks";
import { useState, useEffect, useMemo, useContext } from "react";
import { toast } from 'react-toastify';
import { GlobalContext } from "../context/globalContext";

export default function DetailPage() {
    const { id } = useParams();
    const location = useLocation();
    const path = location.pathname.split("/")[1];
    const navigate = useNavigate();

    //* Determina il tipo di contenuto in modo leggibile per l'interfaccia utente
    const contentType = useMemo(() => {
        if (path.includes("cinemas")) return "film";
        if (path.includes("books")) return "libro";
        if (path.includes("albums")) return "album";
        return "Elemento";
    }, [path]);

    const [data, setData] = useState(null);

    //* Effettua il fetch dei dati quando path o id cambiano
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

    const storageKey = `favourites-${path}`;
    //* Stato locale per i preferiti (inizializzato leggendo il localStorage)
    const [favourites, setFavourites] = useState(() => {
        const saved = localStorage.getItem(storageKey);
        return saved ? JSON.parse(saved) : [];
    });

    //! Salvataggio preferiti
    const onSaveClick = () => {
        if (!data) return;
        if (!favourites.includes(id)) {
            const updated = [...favourites, id];
            setFavourites(updated);
            localStorage.setItem(storageKey, JSON.stringify(updated));
            window.dispatchEvent(new Event("favouritesChanged"));  //? Notifica globale
            navigate(`/${path}`);
            toast.success("Elemento aggiunto ai preferiti");
        } else {
            toast.warning("Elemento già nei preferiti!");
        }
    };

    //! Rimozione preferiti
    const onDeleteClick = (id) => {
        if (!data) return;
        if (favourites.includes(id)) {
            const updated = favourites.filter((favId) => favId !== id);
            setFavourites(updated);
            localStorage.setItem(storageKey, JSON.stringify(updated));
            window.dispatchEvent(new Event("favouritesChanged"));  //? Notifica globale
            navigate(`/${path}`);
            toast.error("Elemento rimosso dai preferiti");
        } else {
            toast.warning("Elemento non presente tra i preferiti");
        }
    }

    const { compData } = useContext(GlobalContext);    //? Accesso al comparatore tramite contesto globale
    const { addComp } = compData;

    //* Aggiunta al comparatore
    const onAddComp = async () => {
        const item = await fetchById(path, id);
        console.log(item);
        addComp(path, item);
        toast.success("Elemento aggiunto al comparatore");
        navigate("/comparators");
    };

    return (
        <div className="p-4 flex flex-col items-center">
            <h1 className="text-2xl font-bold mb-2">Dettaglio {contentType}</h1>
            {renderDetails(path, data)} {/* Mostra i dettagli a seconda della categoria */}
            {/* Pulsanti azione: aggiungi/rimuovi preferiti + comparatore */}
            <div className="flex justify-center gap-4">
                <button onClick={onSaveClick}
                    className="p-2 shadow-md shadow-gray-400 bg-emerald-700 text-white rounded-xl mt-4 hover:bg-emerald-800 cursor-pointer">
                    Aggiungi ai preferiti
                </button>
                <button onClick={() => onDeleteClick(id)}
                    className="p-2 shadow-md shadow-gray-400 bg-red-700 text-white rounded-xl mt-4 hover:bg-red-800 cursor-pointer">
                    Rimuovi dai preferiti
                </button>
                <button onClick={() => onAddComp()}
                    className="p-2 shadow-md shadow-gray-400 bg-blue-700 text-white rounded-xl mt-4 hover:bg-blue-800 cursor-pointer">
                    Aggiungi al comparatore
                </button>
            </div>
        </div>
    );
}

//* Funzione per renderizzare i dettagli a seconda del tipo
const renderDetails = (path, data) => {
    if (!data) return null;

    switch (path) {
        case "cinemas":
            return (
                <div className="grid grid-cols-2 gap-x-2">
                    <p><strong>Id: </strong>{data.id}</p>
                    <p><strong>Titolo film: </strong>{data.title}</p>
                    <p><strong>Categoria film: </strong>{data.category}</p>
                    <p><strong>Regista: </strong>{data.directory}</p>
                    <p><strong>Durata film: </strong>{data.durata} minuti</p>
                    <p><strong>Genere: </strong>{data.genre}</p>
                    <p><strong>Anno d`uscita: </strong>{data.release_year}</p>
                    <p><strong>Valutazione: </strong>{data.rating}</p>

                </div>
            );
        case "books":
            return (
                <div className="grid grid-cols-2 gap-x-2">
                    <p><strong>Id: </strong>{data.id}</p>
                    <p><strong>Titolo libro: </strong>{data.title}</p>
                    <p><strong>Categoria libro: </strong>{data.category}</p>
                    <p><strong>Autore: </strong>{data.author}</p>
                    <p><strong>N°pagine: </strong>{data.pages}</p>
                    <p><strong>Genere: </strong>{data.genre}</p>
                    <p><strong>Anno d`uscita: </strong>{data.release_year}</p>
                    <p><strong>Valutazione: </strong>{data.rating}</p>
                </div>
            );
        case "albums":
            return (
                <div className="grid grid-cols-2 gap-x-2">
                    <p><strong>Id: </strong>{data.id}</p>
                    <p><strong>Titolo album: </strong>{data.title}</p>
                    <p><strong>Categoria album: </strong>{data.category}</p>
                    <p><strong>Artista: </strong>{data.artist}</p>
                    <p><strong>N°Tracce: </strong>{data.n_tracks}</p>
                    <p><strong>Genere: </strong>{data.genre}</p>
                    <p><strong>Anno d`uscita: </strong>{data.release_year}</p>
                    <p><strong>Valutazione: </strong>{data.rating}</p>
                </div>
            );
        default:
            return <p>Dati non disponibili</p>;
    }
};