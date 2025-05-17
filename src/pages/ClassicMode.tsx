import { useEffect, useState } from "react";
import type { ClassicModeProps, Question } from "../types/gameTypes";
import { getRandomQuestions, transformQuestions } from "../utils/utils";
import { questionsData } from "../data";
import QuestionCard from "../components/QuestionCard";
import Button from "../components/Button";
import EndGameScreen from "../components/EndGame";

function ClassicMode({ questionCount, timePerQuestion }: ClassicModeProps) {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [timer, setTimer] = useState<number>(timePerQuestion);
    const [currentScore, setCurrentScore] = useState<number>(0);
    const [isGameOver, setIsGameOver] = useState<boolean>(false);
    const [isFinished, setIsFinished] = useState<boolean>(false);
    const [playerName, setPlayerName] = useState<string>("");
    const [nameSubmitted, setNameSubmitted] = useState<boolean>(false);
    const [countdown, setCountdown] = useState<number | null>(null);

    useEffect(() => {
        fetchQuestions();
    }, []);

    useEffect(() => {
        if (countdown !== null) {
            if (countdown > 0) {
                const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
                return () => clearTimeout(timer);
            } else {
                setCountdown(null);
            }
        }
    }, [countdown]);

    useEffect(() => {
        if (!loading && timer > 0 && countdown === null) {
            const interval = setInterval(() => setTimer((t) => t - 1), 1000);
            return () => clearInterval(interval);
        }

        if (timer === 0 && selectedAnswer === null && !isGameOver) {
            setIsGameOver(true);
        }
    }, [timer, loading, countdown]);

    useEffect(() => {
        setTimer(timePerQuestion);
        setSelectedAnswer(null);
    }, [currentIndex]);

    function fetchQuestions() {
        const transformedQuestions = transformQuestions(questionsData);
        const selectedQuestions = getRandomQuestions(transformedQuestions, questionCount);
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
        setCurrentScore((prevScore) => prevScore + 1);
    }

    function decreaseScore() {
        setCurrentScore((prevScore) => prevScore - 1);
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
        setCurrentScore(0);
        setIsGameOver(false);
        setIsFinished(false);
        setCountdown(3);
        fetchQuestions();
    }

    // Mostrar campo de nombre
    if (!nameSubmitted) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white px-4">
                <h1 className="text-3xl font-bold mb-6">Ingrese su nombre para comenzar</h1>
                <input
                    type="text"
                    placeholder="Tu nombre..."
                    className="p-3 rounded-md text-black w-64 mb-4 text-lg"
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                />
                <button
                    onClick={() => {
                        if (playerName.trim() !== "") {
                            setNameSubmitted(true);
                            setCountdown(3);
                        }
                    }}
                    className="bg-blue-600 px-6 py-3 rounded-lg hover:bg-blue-700 transition"
                >
                    Comenzar
                </button>
            </div>
        );
    }

    if (countdown !== null) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
                <h1 className="text-9xl font-extrabold animate-bounce">{countdown}</h1>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid mb-4"></div>
                <p className="text-xl">Cargando preguntas...</p>
            </div>
        );
    }

    if (isFinished || isGameOver) {
        return (
            <EndGameScreen
                isFinished={isFinished}
                isGameOver={isGameOver}
                player1={playerName}
                player2={null}
                currentScoreP1={currentScore}
                currentScoreP2={null}
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
                currentScoreP1={currentScore}
                currentScoreP2={null}
                currentIndex={currentIndex}
                totalQuestions={questions.length}
                player1={playerName}
                player2={null}
            />
        </div>
    );
}

export default ClassicMode;