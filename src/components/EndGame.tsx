import { useState, useEffect } from "react";
import Confetti from "react-confetti";
import Button from "./Button";
import type { EndGameProps } from "../types/componentTypes";

const EndGameScreen = ({
    isFinished,
    isGameOver,
    player1,
    player2,
    currentScoreP1,
    currentScoreP2,
    restartGame,
}: EndGameProps) => {
    const [bestScore, setBestScore] = useState<number>(0);
    const [confettiActive, setConfettiActive] = useState(false);

    const maxScore = Math.max(currentScoreP1, currentScoreP2 ?? 0);

    const winner =
        player2 && currentScoreP2 !== null
            ? isGameOver
                ? currentScoreP1 > currentScoreP2!
                    ? player1
                    : player2
                : currentScoreP1 === currentScoreP2
                    ? "Empate"
                    : currentScoreP1 > currentScoreP2!
                        ? player1
                        : player2
            : player1;


    useEffect(() => {
        const storedBest = localStorage.getItem("bestScore");
        const best = storedBest ? Number(storedBest) : 0;

        if (maxScore > best) {
            localStorage.setItem("bestScore", maxScore.toString());
            setBestScore(maxScore);
            setConfettiActive(true);

            const timeout = setTimeout(() => setConfettiActive(false), 5000);
            return () => clearTimeout(timeout);
        } else {
            setBestScore(best);
        }
    }, [maxScore]);

    const renderWinnerMessage = () => {
        if (!player2 || currentScoreP2 === null) return null;

        if (winner === "Empate") {
            return (
                <p className="text-3xl font-bold text-yellow-400 mb-4">
                    ¡Es un empate!
                </p>
            );
        }

        return (
            <p className="text-3xl font-bold mb-4">
                Ganador:{" "}
                <span
                    className={winner === player1 ? "text-blue-500" : "text-red-500"}
                >
                    {winner}
                </span>
            </p>
        );
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white text-center px-4 relative">
            {confettiActive && <Confetti recycle={false} numberOfPieces={300} />}

            {isFinished && (
                <>
                    <h2 className="text-4xl font-bold mb-4">🎉 Juego terminado</h2>
                    {renderWinnerMessage()}
                    <p className="text-2xl mb-2">
                        Puntaje final {player1}:{" "}
                        <span className="font-semibold text-blue-400">
                            {currentScoreP1}
                        </span>
                    </p>
                    {player2 && currentScoreP2 !== null && (
                        <p className="text-2xl mb-2">
                            Puntaje final {player2}:{" "}
                            <span className="font-semibold text-red-400">
                                {currentScoreP2}
                            </span>
                        </p>
                    )}
                </>
            )}

            {isGameOver && (
                <>
                    <h2 className="text-4xl font-bold mb-2 text-red-500">
                        ⏱️ ¡Game Over!
                    </h2>
                    <p className="text-2xl mb-4">
                        Se terminó el tiempo. {player2 && winner !== "Empate" && `¡${winner} gana por tiempo!`}
                    </p>
                    {renderWinnerMessage()}
                    <p className="text-xl mb-2">
                        Puntaje final {player1}:{" "}
                        <span className="font-semibold text-blue-400">
                            {currentScoreP1}
                        </span>
                        {player2 && currentScoreP2 !== null && (
                            <>
                                {" "}
                                / {player2}:{" "}
                                <span className="font-semibold text-red-400">
                                    {currentScoreP2}
                                </span>
                            </>
                        )}
                    </p>
                </>
            )}

            <div className="bg-gray-800 rounded-xl p-6 mt-6 w-full max-w-md shadow-lg">
                <h3 className="text-2xl font-semibold mb-3">
                    🏆 Mejor Puntaje Histórico
                </h3>
                <p className="text-lg">
                    {bestScore > 0
                        ? `El mejor puntaje es ${bestScore}`
                        : "Aún no hay puntajes registrados."}
                </p>
                {maxScore > bestScore && (
                    <p className="text-green-400 font-bold mt-2">
                        ¡Felicitaciones! Superaste el mejor puntaje 🎉
                    </p>
                )}
            </div>

            <div className="mt-8 flex flex-col gap-2 w-full max-w-md">
                <Button text="Volver al inicio" to="/" />
                <button
                    onClick={restartGame}
                    className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl shadow-md hover:scale-105 transform transition duration-300 ease-in-out text-center"
                >
                    Reiniciar juego
                </button>
            </div>
        </div>
    );
};

export default EndGameScreen;
