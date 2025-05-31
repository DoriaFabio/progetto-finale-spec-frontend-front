import { useState, useEffect } from "react";
const VITE_API_URL = import.meta.env.VITE_API_URL;

//! Hook personalizzato per ottenere i dati iniziali di albums, cinemas e books
export default function useTasks() {
    //? Dati per memorizzare i dati delle 3 categorie
    const [albums, setAlbums] = useState([]);
    const [cinemas, setCinemas] = useState([]);
    const [books, setBooks] = useState([]);

    //! Effetto eseguito una sola volta al montaggio del componente
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

//* Funzione asincrona per recuperare un singolo elemento da un endpoint API dato un path e un id
export async function fetchById(path, id) {
    try {
        const res = await fetch(`${VITE_API_URL}/${path}/${id}`);
        if (!res.ok) throw new Error("Errore nella risposta del server");
        const json = await res.json();
        console.log(json);
        
        return json[path.slice(0, -1)]; //? Rimuove la s finale per ottenere il nome del singolo oggetto
    } catch (err) {
        console.error("Errore nel caricamento dei dati", err);
        throw err;
    }
}