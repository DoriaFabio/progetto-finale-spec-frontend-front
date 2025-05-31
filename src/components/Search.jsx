import { useCallback } from "react";

//! Funzione debounce: limita la frequenza con cui viene chiamata una funzione
function debounce(callback, delay) {
    let timer;
    return (value) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            callback(value);
        }, delay);
    }
}

//! Componente Search: campo input per la ricerca con debounce
export default function Search({ onSearch }) {
    const debounceSearch = useCallback(debounce(onSearch, 500), [onSearch]);
    return (
        <input type="text"
            placeholder="Cerca per titolo"
            onChange={e => debounceSearch(e.target.value)}
            className="bg-amber-50 rounded-xl text-black p-2 shadow-md shadow-gray-400"
        />
    )
}
