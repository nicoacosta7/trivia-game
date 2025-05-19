import type { QuestionCardProps } from "../types/componentTypes";
import AnswerList from "./AnswerList";

const QuestionCard = ({
    question,
    onAnswer,
    selected,
    timer,
    currentScoreP1,
    currentScoreP2,
    currentIndex,
    totalQuestions,
    player1,
    player2,
}: QuestionCardProps) => (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 px-4">
        <div className="bg-white rounded-3xl shadow-xl p-10 w-full max-w-xl text-center space-y-8">
            <p className="text-sm text-gray-500 tracking-wide">
                Pregunta {currentIndex + 1} / {totalQuestions}
            </p>

            {player2 && (
                <p className="text-md text-gray-600 font-semibold mb-4">
                    <span
                        className={
                            currentIndex % 2 === 0
                                ? "text-blue-700"
                                : "text-red-700"
                        }
                    >
                        Turno de{" "} {currentIndex % 2 === 0 ? player1 : player2}
                    </span>
                </p>
            )}

            <h2 className="text-3xl font-extrabold text-gray-900 leading-snug">
                {question.question}
            </h2>

            <p className="text-lg text-gray-700 font-semibold mb-6">
                ⏱️ Tiempo restante:{" "}
                <span className="font-bold text-gray-900">{timer}s</span>
            </p>

            <AnswerList
                answers={question.answers}
                selected={selected}
                onAnswer={onAnswer}
                correctAnswer={question.correctAnswer}
            />

            <div className="flex justify-around mt-8 space-x-8">
                <div className="bg-blue-100 bg-opacity-50 rounded-xl px-6 py-4 w-1/2 shadow-md">
                    <p className="text-lg font-semibold text-blue-800">{player1}</p>
                    <p className="text-4xl font-extrabold text-blue-900">{currentScoreP1}</p>
                </div>
                {player2 && <div className="bg-red-100 bg-opacity-50 rounded-xl px-6 py-4 w-1/2 shadow-md">
                    <p className="text-lg font-semibold text-red-800">{player2}</p>
                    <p className="text-4xl font-extrabold text-red-900">{currentScoreP2}</p>
                </div>}
            </div>
        </div>
    </div>
);

export default QuestionCard;