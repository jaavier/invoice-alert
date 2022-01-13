export default function Button({ type, text, onClick, size = 2, pressed = false }) {
    if (!type) type = "danger";
    let color = {
        primary: `${!pressed ? 'bg-blue-500' : 'bg-blue-700'} text-white font-bold py-${size} px-4 rounded`,
        secondary: `${!pressed ? 'bg-gray-500' : 'bg-gray-700'} text-white font-bold py-${size} px-4 rounded`,
        success: `${!pressed ? 'bg-green-500' : 'bg-green-700'} text-white font-bold py-${size} px-4 rounded`,
        danger: `${!pressed ? 'bg-red-500' : 'bg-red-700'} text-white font-bold py-${size} px-4 rounded`,
        warning: `${!pressed ? 'bg-orange-500' : 'bg-orange-700'} text-white font-bold py-${size} px-4 rounded`,
        info: `${!pressed ? 'bg-indigo-500' : 'bg-blue-700'} text-white font-bold py-${size} px-4 rounded`,
        light: `${!pressed ? 'bg-gray-100' : 'bg-gray-200'} text-gray-800 font-bold py-${size} px-4 rounded`,
        dark: `${!pressed ? 'bg-gray-800' : 'bg-gray-900'} text-white font-bold py-${size} px-4 rounded`,
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
