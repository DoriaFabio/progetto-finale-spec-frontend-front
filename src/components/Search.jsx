import { useCallback } from "react";

function debounce(callback, delay) {
    let timer;
    return (value) => {
        clearInterval(timer);
        timer = setTimeout(() => {
            callback(value);
        }, delay);
    }
}

export default function Search({ onSearch }) {
    const debounceSearch = useCallback(debounce(onSearch, 500), []);
    return (
        <input type="text"
            placeholder="Cerca per titolo"
            onChange={e => debounceSearch(e.target.value)}
            className="bg-amber-50 rounded-xl text-black p-2 mb-5 shadow"
        />
    )
}
