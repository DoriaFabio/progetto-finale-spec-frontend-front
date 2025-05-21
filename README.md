# 🖼️ Cosa devi realizzare
Una SPA in React che simula l’esperienza di un utente non autenticato, che può:
  Sfogliare, cercare e filtrare record
  Confrontare più elementi tra loro
  Salvare i preferiti
  ❌ Non può creare, modificare o cancellare record.

# 🏆 Requisiti Minimi
Per considerare il progetto completo, devono essere implementate almeno queste funzionalità:
  <!--todo - Gestione di una risorsa definita in types.ts -->
  <!--todo - Lista dei record, che mostra solo le proprietà principali title e category, e include: -->
      - Barra di ricerca per cercare nei titoli (title)
      - Filtro per categoria (category)
      - Ordinamento alfabetico per title o category (A-Z e Z-A)
  - Pagina di dettaglio per ogni record, con visualizzazione estesa delle sue proprietà (es. price, description, brand, ecc.)
  - Comparatore di 2 record, visualizzati affiancati per confrontarne le caratteristiche. 
  - È libera la modalità di selezione: puoi permettere all’utente di aggiungere record al comparatore direttamente dalla lista, dalla pagina di dettaglio, oppure usare un menu a tendina, checkbox o qualsiasi altro sistema.
  L’importante è che l’utente possa scegliere 2 record qualsiasi e confrontarli in modo chiaro.
  - Sistema di preferiti, sempre accessibile e aggiornabile:
      - L’utente può aggiungere o rimuovere record dai preferiti in qualsiasi momento
      - I preferiti devono essere consultabili in ogni sezione dell’app (es. tramite una sezione dedicata, un’icona fissa, o una sidebar)

# 🔧 API disponibili
Ecco le API REST disponibili per ogni tipo di risorsa:
  - POST /{tipo}s ➡️ Crea un nuovo record. Vengono ignorate le proprietà id, createdAt, updatedAt, se passate (vengono gestite autonomamente dal server). Restituisce il record completo.
  - GET /{tipo}s/:id ➡️ Restituisce un record per id. Restituisce errore se non trovato.
  - PUT /{tipo}s/:id ➡️ Aggiorna un record per id. Vengono ignorate le proprietà id, createdAt, updatedAt, se passate Restituisce errore se non trovato.
  - DELETE /{tipo}s/:id ➡️ Elimina il record per id. Restituisce errore se non trovato.
  - GET /{tipo}s ➡️ Restituisce la lista dei record Solo proprietà: id, createdAt, updatedAt, title, category Supporta query string:
      - ?search=... → cerca in title
      - ?category=... → filtra per category
    Esempio: /products?search=iphone&category=tech

# 🔧 Dove vengono salvati i dati?
Ogni risorsa viene salvata come file .json in /database.
Esempio: se definisci Product, il backend creerà product.json.

✅ Puoi inserire i dati:
    - Tramite API (fetch, Postman…)
    - Manualmente nei file .json (rispettando la forma del tipo)
📌 Popola ogni risorsa con almeno 10 record validi, per avere materiale sufficiente da confrontare.