export default function FilterCategory({ data, onFilter }) {
    const categories = [...new Set(data.map(c => c.category))];

    return (
        <select className="p-2 h-fit rounded-xl shadow-md shadow-gray-400" onChange={(e) => onFilter(e.target.value)}>
            <option value="" default>Tutti</option>
            {categories.map((c, i) => {
                return <option value={c} key={i}>{c}</option>
            })}
        </select>
    )
}
