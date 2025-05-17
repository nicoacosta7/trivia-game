import Button from "../components/Button.tsx";

function Home() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen gap-10 bg-gradient-to-br from-gray-900 to-gray-800 px-4">
      <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 drop-shadow-lg text-center">
        🎯 Trivia Game
      </h1>

      <div className="flex flex-col gap-6 w-full max-w-xs">
        <Button text="🎮 Modo Clásico" to="/classic" />
        <Button text="⚔️ Modo Batalla (1 vs 1)" to="/battle" />
      </div>
    </div>
  );
}

export default Home;