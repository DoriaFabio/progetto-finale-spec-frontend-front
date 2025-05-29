import { createContext } from "react";
import useTasks from "../hooks/useTasks";
import { useState } from "react";

export const GlobalContext = createContext({});

export function GlobalProvider({ children }) {
    const taskData = useTasks();
    const [compCinemas, setCompCinemas] = useState([]);
    const [compBooks, setCompBooks] = useState([]);
    const [compAlbums, setCompAlbums] = useState([]);
    
    const addComp = (type, item) => {
        console.log(item);
        if (type === 'cinemas') setCompCinemas(prev => prev.some(i => i.id === item.id) ? prev : [...prev, item]);
        if (type === 'books') setCompBooks(prev => prev.some(i => i.id === item.id) ? prev : [...prev, item]);
        if (type === 'albums') setCompAlbums(prev => prev.some(i => i.id === item.id) ? prev : [...prev, item]);
    };

    const removeComp = (type, id) => {
        if (type === 'cinemas') setCompCinemas(prev => prev.filter(i => i.id !== id));
        if (type === 'books') setCompBooks(prev => prev.filter(i => i.id !== id));
        if (type === 'albums') setCompAlbums(prev => prev.filter(i => i.id !== id));
    };

    const compData = { compCinemas, compAlbums, compBooks, addComp, removeComp }

    return (
        <GlobalContext.Provider value={{ ...taskData, compData }}>
            {children}
        </GlobalContext.Provider>
    )
}