export default function Button({ type, text, onClick }) {
    if (!type) type = "danger";
    let color = {
        primary: 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded',
        secondary: 'bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded',
        success: 'bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded',
        danger: 'bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded',
        warning: 'bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded',
        info: 'bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded',
        light: 'bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded',
        dark: 'bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded',
    }[type]
    return (
        <button
            className={color}
            onClick={onClick}
        >
            {text}
        </button>
    );
}
