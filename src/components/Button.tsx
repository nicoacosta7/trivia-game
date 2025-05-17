import type { ButtonProps } from "../types/componentTypes";
import { Link } from "react-router-dom";

function Button({ text, to }: ButtonProps) {
    return (
        <Link
            to={to}
            className="inline-block px-6 py-3 bg-blue-600 text-white text-center rounded hover:bg-blue-700 transition"
        >
            {text}
        </Link>
    );
}

export default Button;
