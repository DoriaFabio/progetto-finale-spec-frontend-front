import { useState, useCallback } from "react";

export default function useSort(order) {
    const [sortBy, setSortBy] = useState(order);
    const [sortOrder, setSortOrder] = useState(1);

    const handleOrder = useCallback((c) => {
        if (sortBy === c) {
            setSortOrder((prev) => prev * -1);
        } else {
            setSortBy(c);
            setSortOrder(1);
        }
    }, [sortBy])

    const filterSort = useCallback((a,b) => {
        let compare;
        if (sortBy === "title") {
          compare = a.title.localeCompare(b.title);
        } else {
          compare = a.category.localeCompare(b.category);
        }
        return compare * sortOrder;
    }, [sortBy, sortOrder])

    return { sortBy, sortOrder, handleOrder, filterSort }
}