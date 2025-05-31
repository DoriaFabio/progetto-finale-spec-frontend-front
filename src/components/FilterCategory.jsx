export default function FilterCategory({ data, onFilter }) {
    //? Estrae tutte le categorie uniche dall'array "data"
    const categories = [...new Set(data.map(c => c.category))]; 

    return (
        // Select per scegliere la categoria da filtrare
        <select className="p-2 h-fit rounded-xl shadow-md shadow-gray-400 bg-amber-50" onChange={(e) => onFilter(e.target.value)}>
            <option value="" default>Tutti</option>
            {categories.map((c, i) => {
                return <option value={c} key={i}>{c}</option>
            })}
        </select>
    )
}
