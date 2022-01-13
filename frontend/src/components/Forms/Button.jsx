export default function Button({ text, onClick }) {
    return (
        <button
            className="bg-green-500 hover:bg-green-700 text-green-100 font-bold py-2 px-4 rounded"
            onClick={onClick}
        >
            {text}
        </button>
    );
}
