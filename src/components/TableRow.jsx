import React from "react"
import { Link } from "react-router-dom";

//! Componente memoizzato per evitare rendering inutili se le props non cambiano
const TableRow = React.memo(({ data, path }) => {
    return (
        <tr>
            {/* Colonna del titolo con effetto hover */}
            <td className="border py-1 px-2 hover:bg-green-100 transition duration-500 ease-in-out">
                <Link to={`/${path}/${data.id}`}>{data.title}</Link>
            </td>
            {/* Colonna della categoria centrata con effetto hover */}
            <td className="border py-1 px-2 hover:bg-green-100 transition duration-500 ease-in-out text-center">
                {data.category}
            </td>
        </tr>
    );
});

//! Impostazione del nome leggibile del componente
TableRow.displayName = "TableRow";

export default TableRow;
