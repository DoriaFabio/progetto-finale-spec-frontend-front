import { useState, useCallback } from "react";

//* Hook personalizzato per gestire l'ordinamento di una lista di elementi
export default function useSort(order) {
    //? Stato che tiene traccia del campo attualmente usato per l'ordinamento
    const [sortBy, setSortBy] = useState(order);
    //? Stato che determina la direzione dell'ordinamento: 1 (ascendente) o -1 (discendente)
    const [sortOrder, setSortOrder] = useState(1);

    //* Gestisce il cambio di ordinamento quando l'utente clicca su un'intestazione di colonna.
    const handleOrder = useCallback((c) => {
        if (sortBy === c) {
            setSortOrder((prev) => prev * -1);
        } else {
            setSortBy(c);
            setSortOrder(1);
        }
    }, [sortBy])

    //* Funzione che ordina gli elementi in base al campo sortBy e alla direzione sortOrder
    const filterSort = useCallback((a,b) => {
        let compare;
        if (sortBy === "title") {
          compare = a.title.localeCompare(b.title);
        } else if (sortBy === "category") {
          compare = a.category.localeCompare(b.category);
        }
        return compare * sortOrder;
    }, [sortBy, sortOrder])

    return { sortBy, sortOrder, handleOrder, filterSort }
}