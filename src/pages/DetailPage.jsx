import { useParams, useLocation } from "react-router-dom";
import { fetchById } from "../hooks/useTasks";
import { useState, useEffect } from "react";

export default function DetailPage() {
    const { id } = useParams();
    const location = useLocation();
    const pathParts = location.pathname.split("/");
    const path = pathParts[1];
    let contentType;
    if (path.includes("cinemas")) contentType = "Movie";
    else if (path.includes("books")) contentType = "Book";
    else if (path.includes("albums")) contentType = "Album";
    const [data, setData] = useState(null);

    useEffect(() => {
        if (path && id) {
            fetchById(path, id)
                .then(setData)
                .catch(err => console.error(err))
        }
    }, [path, id]);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-2">Dettagli {contentType}</h1>
            <p>ID: {id}</p>
            <p>{data?.title || "Nessun titolo trovato"}</p>
        </div>
    );
}
