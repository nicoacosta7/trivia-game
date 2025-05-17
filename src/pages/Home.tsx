import Button from "../components/Button.tsx";

function Home() {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen gap-6">
            <h1 className="text-5xl font-bold text-blue-200">Trivia Game</h1>
            <div className="flex flex-col gap-4">
                <Button text="Modo Clásico" to="/classic" />
                <Button text="Modo Batalla (1 vs 1)" to="/battle" />
            </div>
        </div>
    );
}

export default Home;