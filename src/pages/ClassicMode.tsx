import { useEffect, useState } from "react";
import type { ClassicModeProps, Question } from "../types/gameTypes";
import { transformQuestions } from "../utils/utils";
import { questionsData } from "../data";
import QuestionCard from "../components/QuestionCard";
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

    useEffect(() => {
        fetchQuestions();
    }, []);

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
        const selectedQuestions = getRandomQuestions(transformedQuestions, questionCount);
        setQuestions(selectedQuestions);
        setLoading(false);
    }

    function getRandomQuestions(questions: Question[], count: number): Question[] {
        const shuffled = [...questions].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, count);
    }

    function handleAnswer(answer: string) {
        setSelectedAnswer(answer);
        validateAnswer(answer);
        setTimeout(() => {
            handleNext();
        }, 1000)
    }

    function increaseScore() {
        setCurrentScore((prevScore) => {
            const newScore = prevScore + 1;
            console.log("currentScore", newScore);
            return newScore;
        });
    }


    function decreaseScore() {
        setCurrentScore((prevScore) => {
            const newScore = prevScore - 1;
            return newScore;
        });
    }

    function validateAnswer(answer: string) {
        if (answer === questions[currentIndex].correctAnswer) {
            console.log("correct answer");
            increaseScore();
        } else {
            console.log("bad answer");
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

        fetchQuestions();
    }

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid mb-4"></div>
                <p className="text-xl">Cargando preguntas...</p>
            </div>
        );
    }

    if (isFinished) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white text-center px-4">
                <h2 className="text-4xl font-bold mb-4">🎉 Juego terminado</h2>
                <p className="text-2xl mb-2">
                    Puntaje final: <span className="font-semibold text-green-400">{currentScore}</span>
                </p>
                <div className="mt-6 flex flex-col gap-2">
                    <Button text="Volver al inicio" to="/" />
                    <button
                        onClick={restartGame}
                        className="w-full block px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl shadow-md hover:scale-105 transform transition duration-300 ease-in-out text-center"
                    >
                        Reiniciar juego
                    </button>
                </div>
            </div>
        );
    }

    if (isGameOver) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white text-center px-4">
                <h2 className="text-4xl font-bold mb-2 text-red-500">⏱️ ¡Game Over!</h2>
                <p className="text-2xl">Se te terminó el tiempo</p>
                <p className="text-xl mt-4 mb-2">
                    Puntaje: <span className="font-semibold text-yellow-400">{currentScore}</span>
                </p>
                <div className="mt-6 flex flex-col gap-2">
                    <Button text="Volver al inicio" to="/" />
                    <button
                        onClick={restartGame}
                        className="w-full block px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl shadow-md hover:scale-105 transform transition duration-300 ease-in-out text-center"
                    >
                        Reiniciar juego
                    </button>

                </div>
            </div>
        );
    }

    return (
        <div>
            <QuestionCard
                question={questions[currentIndex]}
                onAnswer={handleAnswer}
                selected={selectedAnswer ?? ""}
                timer={timer}
                currentScore={currentScore}
                currentIndex={currentIndex}
                totalQuestions={questions.length}
            />
        </div>
    );
}

export default ClassicMode;