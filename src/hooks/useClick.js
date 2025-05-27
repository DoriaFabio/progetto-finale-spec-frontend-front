import { useState } from "react";

export default function useClick(storageKey, uniqueId = null, data = null) {
    const [favourites, setFavourites] = useState(() => {
        const saved = localStorage.getItem(storageKey);
        return saved ? JSON.parse(saved) : [];
    });

    //! Salvataggio preferiti
    const onSaveClick = () => {
        if (!data) return;
        if (!favourites.includes(uniqueId)) {
            const updated = [...favourites, uniqueId];
            setFavourites(updated);
            localStorage.setItem(storageKey, JSON.stringify(updated));
            alert("Aggiunto ai preferiti!");
        } else {
            alert("Elemento già nei preferiti!");
        }
    };

    //!Rimozione preferiti
    const onDeleteClick = (id) => {
        if (!data) return;
        if (favourites.includes(id)) {
            const updated = favourites.filter((favId) => favId !== id);
            setFavourites(updated)
            localStorage.setItem(storageKey, JSON.stringify(updated));
            alert("Elemento eliminato dai preferiti");
        } else {
            alert("Elemento non presente tra i preferiti");
        }
    }

    return { favourites, onSaveClick, onDeleteClick }
}


