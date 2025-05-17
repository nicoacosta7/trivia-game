import type { CountDownProps } from "../types/componentTypes";

function CountDown({ countdown }: CountDownProps) {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
                <h1 className="text-9xl font-extrabold animate-bounce">{countdown}</h1>
            </div>
    );
}

export default CountDown;