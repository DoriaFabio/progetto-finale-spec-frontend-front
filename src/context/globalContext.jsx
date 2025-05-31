import { createContext } from "react";
import useTasks from "../hooks/useTasks";
import { useState } from "react";

//! Creazione del contesto globale per fornire dati a tutta l'app
export const GlobalContext = createContext({});

export function GlobalProvider({ children }) {
    const taskData = useTasks(); //? Recupera i dati relativi ai task tramite un hook personalizzato
    //? Stati per tenere traccia degli elementi confrontati
    const [compCinemas, setCompCinemas] = useState([]);
    const [compBooks, setCompBooks] = useState([]);
    const [compAlbums, setCompAlbums] = useState([]);

    //* Aggiunge un elemento alla lista di confronto del tipo specificato
    const addComp = (type, item) => {
        console.log(item);
        if (type === 'cinemas') setCompCinemas(prev => prev.some(i => i.id === item.id) ? prev : [...prev, item]);
        if (type === 'books') setCompBooks(prev => prev.some(i => i.id === item.id) ? prev : [...prev, item]);
        if (type === 'albums') setCompAlbums(prev => prev.some(i => i.id === item.id) ? prev : [...prev, item]);
    };

    //* Rimuove un elemento dalla lista di confronto in base al tipo e all'id
    const removeComp = (type, id) => {
        if (type === 'cinemas') setCompCinemas(prev => prev.filter(i => i.id !== id));
        if (type === 'books') setCompBooks(prev => prev.filter(i => i.id !== id));
        if (type === 'albums') setCompAlbums(prev => prev.filter(i => i.id !== id));
    };

    //? Raggruppa i dati di confronto in un oggetto da fornire via contesto
    const compData = { compCinemas, compAlbums, compBooks, addComp, removeComp }

    //? Fornisce il contesto globale ai componenti figli
    return (
        <GlobalContext.Provider value={{ ...taskData, compData }}>
            {children}
        </GlobalContext.Provider>
    )
}