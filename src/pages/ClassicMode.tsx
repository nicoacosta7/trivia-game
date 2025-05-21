import { useEffect, useState } from "react";
import type { ClassicModeProps, Question } from "../types/gameTypes";
import { getQuestions } from "../utils/utils";
import QuestionCard from "../components/QuestionCard";
import EndGameScreen from "../components/EndGame";
import Loader from "../components/Loader";
import CountDown from "../components/CountDown";
import Button from "../components/Button";

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
    const [isGameStarted, setIsGameStarted] = useState(false);

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
        if (!loading && timer > 0 && countdown === null && isGameStarted) {
            const interval = setInterval(() => setTimer((t) => t - 1), 1000);
            return () => clearInterval(interval);
        }

        if (timer === 0 && selectedAnswer === null && !isGameOver && isGameStarted) {
            setIsGameOver(true);
        }
    }, [timer, loading, countdown, isGameStarted]);

    useEffect(() => {
        setTimer(timePerQuestion);
        setSelectedAnswer(null);
    }, [currentIndex]);

    async function fetchQuestions() {
        try {
            setLoading(true);

            const questions = await getQuestions(questionCount);

            if (questions) {
                setQuestions(questions);
            }
        } catch (error) {
            console.error("Error en fetchQuestions:", error);
        } finally {
            setLoading(false);
        }
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
        const isCorrect = answer === questions[currentIndex].correctAnswer;

        if (isCorrect) {
            increaseScore();
        } else {
            decreaseScore();
        }
    }

    function handleNext() {
        const isLastQuestion = currentIndex === questions.length - 1;

        if (!isLastQuestion) {
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
                <div className="mt-6 flex flex-col gap-2">
                    <button
                        onClick={() => {
                            if (playerName.trim() !== "") {
                                setNameSubmitted(true);
                                setCountdown(3);
                                setTimeout(() => setIsGameStarted(true), 3000);
                            }
                        }}
                        className="w-full block px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl shadow-md hover:scale-105 transform transition duration-300 ease-in-out text-center"
                    >
                        Comenzar
                    </button>
                    <Button text="Volver al inicio" to="/" />
                </div>
            </div>
        );
    }

    if (countdown !== null) {
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