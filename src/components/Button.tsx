import type { ButtonProps } from "../types/componentTypes";
import { Link } from "react-router-dom";

function Button({ text, to }: ButtonProps) {
    return (
        <Link
            to={to}
            className="w-full block px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl shadow-md hover:scale-105 transform transition duration-300 ease-in-out text-center"
        >
            {text}
        </Link>
    );
}

export default Button;
