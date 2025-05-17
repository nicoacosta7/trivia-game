import type { QuestionCardProps } from "../types/componentTypes";
import AnswerList from "./AnswerList";

const QuestionCard = ({
    question,
    onAnswer,
    selected,
    timer,
    currentScore,
    currentIndex,
    totalQuestions,
}: QuestionCardProps) => (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-xl text-center space-y-6">
            <p className="text-sm text-gray-500">
                Pregunta {currentIndex + 1} / {totalQuestions}
            </p>

            <h2 className="text-2xl font-bold text-gray-800">{question.question}</h2>

            <p className="text-lg text-gray-600">
                ⏱️ Tiempo restante: <span className="font-semibold">{timer}s</span>
            </p>

            <AnswerList
                answers={question.answers}
                selected={selected}
                onAnswer={onAnswer}
                correctAnswer={question.correctAnswer}
            />

            <p className="text-lg font-medium text-gray-700">
                Puntaje: <span className="text-blue-600">{currentScore}</span>
            </p>
        </div>
    </div>
);

export default QuestionCard;