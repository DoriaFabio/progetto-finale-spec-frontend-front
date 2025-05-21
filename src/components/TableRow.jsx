import React from "react"

//! Componente memoizzato per evitare rendering inutili se le props non cambiano
const TableRow = React.memo(({ data }) => {
    return (
        <tr>
            {/* Colonna del titolo con effetto hover */}
            <td className="border p-2 hover:bg-blue-300 transition duration-500 ease-in-out">
                {data.title}
            </td>

            {/* Colonna della categoria centrata con effetto hover */}
            <td className="border p-2 hover:bg-blue-300 transition duration-500 ease-in-out text-center">
                {data.category}
            </td>
        </tr>
    );
});

//! Impostazione del nome leggibile del componente (utile per debug con React DevTools)
TableRow.displayName = "TableRow";

export default TableRow;
