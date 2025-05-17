import { useEffect, useState } from "react";
import type { BattleModeProps, Question } from "../types/gameTypes";
import { getRandomQuestions, transformQuestions } from "../utils/utils";
import { questionsData } from "../data";
import Button from "../components/Button";
import QuestionCard from "../components/QuestionCard";
import EndGameScreen from "../components/EndGame";
import Loader from "../components/Loader";
import CountDown from "../components/CountDown";

function BattleMode({ questionCount, timePerQuestion }: BattleModeProps) {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [timer, setTimer] = useState<number>(timePerQuestion);

    const [currentScoreP1, setCurrentScoreP1] = useState<number>(0);
    const [currentScoreP2, setCurrentScoreP2] = useState<number>(0);
    const [isGameOver, setIsGameOver] = useState<boolean>(false);
    const [isFinished, setIsFinished] = useState<boolean>(false);

    const [player1, setPlayer1] = useState<string>("");
    const [player2, setPlayer2] = useState<string>("");
    const [gameStarted, setGameStarted] = useState<boolean>(false);
    const [countdown, setCountdown] = useState<number>(3);

    useEffect(() => {
        if (gameStarted && countdown > 0) {
            const countdownTimer = setInterval(() => {
                setCountdown((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(countdownTimer);
        }

        if (gameStarted && countdown === 0) {
            fetchQuestions();
        }
    }, [gameStarted, countdown]);

    useEffect(() => {
        if (!loading && timer > 0) {
            const interval = setInterval(() => setTimer((t) => t - 1), 1000);
            return () => clearInterval(interval);
        }

        if (timer === 0 && selectedAnswer === null && !isGameOver) {
            setIsGameOver(true);
        }
    }, [timer, loading]);

    useEffect(() => {
        setTimer(timePerQuestion);
        setSelectedAnswer(null);
    }, [currentIndex]);

    function fetchQuestions() {
        const transformedQuestions = transformQuestions(questionsData);
        const selectedQuestions = getRandomQuestions(transformedQuestions, questionCount * 2);
        setQuestions(selectedQuestions);
        setLoading(false);
    }

    function handleAnswer(answer: string) {
        setSelectedAnswer(answer);
        validateAnswer(answer);
        setTimeout(() => {
            handleNext();
        }, 1000);
    }

    function increaseScore() {
        if (currentIndex % 2 === 0) {
            setCurrentScoreP1((prev) => prev + 1);
        } else {
            setCurrentScoreP2((prev) => prev + 1);
        }
    }

    function decreaseScore() {
        if (currentIndex % 2 === 0) {
            setCurrentScoreP1((prev) => prev - 1);
        } else {
            setCurrentScoreP2((prev) => prev - 1);
        }
    }

    function validateAnswer(answer: string) {
        if (answer === questions[currentIndex].correctAnswer) {
            increaseScore();
        } else {
            decreaseScore();
        }
    }

    function handleNext() {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            setIsFinished(true);
        }
    }

    function restartGame() {
        setLoading(true);
        setQuestions([]);
        setCurrentIndex(0);
        setSelectedAnswer(null);
        setTimer(timePerQuestion);
        setCurrentScoreP1(0);
        setCurrentScoreP2(0);
        setIsGameOver(false);
        setIsFinished(false);
        setGameStarted(false);
        setCountdown(3);
        setPlayer1("");
        setPlayer2("");
    }

    if (!gameStarted) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6 space-y-4">
                <h1 className="text-3xl font-bold mb-4">👥 Modo Batalla</h1>
                <input
                    type="text"
                    value={player1}
                    onChange={(e) => setPlayer1(e.target.value)}
                    placeholder="Nombre del Jugador 1"
                    className="p-3 rounded-lg text-black w-64"
                />
                <input
                    type="text"
                    value={player2}
                    onChange={(e) => setPlayer2(e.target.value)}
                    placeholder="Nombre del Jugador 2"
                    className="p-3 rounded-lg text-black w-64"
                />
                <div className="mt-6 flex flex-col gap-2">
                    <button
                        onClick={() => {
                            if (player1 && player2) setGameStarted(true);
                        }}
                        disabled={!player1 || !player2}
                        className="w-full block px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl shadow-md hover:scale-105 transform transition duration-300 ease-in-out text-center"
                    >
                        Comenzar Juego
                    </button>
                    <Button text="Volver al inicio" to="/" />
                </div>
            </div>
        );
    }

    if (gameStarted && countdown > 0) {
        return <CountDown countdown={countdown.toString()} />;

    }

    if (loading) {
        return <Loader message="Cargando preguntas..." />;
    }

    if (isFinished || isGameOver) {
        return (
            <EndGameScreen
                isFinished={isFinished}
                isGameOver={isGameOver}
                player1={player1}
                player2={player2}
                currentScoreP1={currentScoreP1}
                currentScoreP2={currentScoreP2}
                restartGame={restartGame}
            />
        );
    }

    return (
        <div>
            <QuestionCard
                question={questions[currentIndex]}
                onAnswer={handleAnswer}
                selected={selectedAnswer ?? ""}
                timer={timer}
                currentScoreP1={currentScoreP1}
                currentScoreP2={currentScoreP2}
                currentIndex={currentIndex}
                totalQuestions={questions.length}
                player1={player1}
                player2={player2}
            />
        </div>
    );
}

export default BattleMode;