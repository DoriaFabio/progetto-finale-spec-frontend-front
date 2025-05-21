import { useState, useEffect } from "react";
const VITE_API_URL = import.meta.env.VITE_API_URL;

export default function useTasks() {
    const [albums, setAlbums] = useState([]);
    const [cinemas, setCinemas] = useState([]);
    const [books, setBooks] = useState([]);
    useEffect(() => {
        Promise.all([
            fetch(`${VITE_API_URL}/albums`).then(res => res.json()),
            fetch(`${VITE_API_URL}/cinemas`).then(res => res.json()),
            fetch(`${VITE_API_URL}/books`).then(res => res.json())
        ])
            .then(([albumsData, cinemasData, booksData]) => {
                setAlbums(albumsData);
                setCinemas(cinemasData);
                setBooks(booksData);
            })
            .catch(err => console.error("Errore nel caricamento dei dati:", err));
    }, []);

    return { albums, cinemas, books }
}