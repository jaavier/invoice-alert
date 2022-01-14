export default function LimitPerPage({ limit, setLimit }) {
    console.log("🚀 ~ file: LimitPerPage.jsx ~ line 2 ~ LimitPerPage ~ limit", limit)
    return (
        <div className="flex mr-2">
            <div className="mt-1 mr-2 text-white font-semibold">Per page:</div>
            <div>
                <input type="number" placeholder="Limit" value={limit} onChange={(e) => setLimit(e.target.value)} className="p-1 rounded-lg" />
            </div>
        </div>
    )
}