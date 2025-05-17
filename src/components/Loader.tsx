import type { LoaderProps } from "../types/componentTypes";

function Loader({message}: LoaderProps) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid mb-4"></div>
            <p className="text-xl">{message}</p>
        </div>
    );
}

export default Loader;