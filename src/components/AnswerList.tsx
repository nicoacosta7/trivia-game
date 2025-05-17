import type { AnswerListProps } from "../types/componentTypes";

function AnswerList({ answers, selected, correctAnswer, onAnswer }: AnswerListProps) {
  return (
    <div className="flex flex-col gap-4 mt-6">
      {answers.map((answer) => {
        const isCorrect = answer === correctAnswer;
        const isSelected = answer === selected;

        let buttonClass = "w-full py-3 px-4 rounded-xl font-semibold transition-colors duration-300";

        if (selected) {
          if (isSelected && isCorrect) {
            buttonClass += " bg-green-500 text-white";
          } else if (isSelected && !isCorrect) {
            buttonClass += " bg-red-500 text-white";
          } else if (!isSelected && isCorrect) {
            buttonClass += " bg-green-500 text-white";
          } else {
            buttonClass += " bg-gray-200 text-gray-500";
          }
        } else {
          buttonClass += " bg-gray-100 text-gray-800 hover:bg-blue-100 hover:text-blue-700";
        }

        return (
          <button
            key={answer}
            onClick={() => onAnswer(answer)}
            disabled={!!selected}
            className={buttonClass}
          >
            {answer}
          </button>
        );
      })}
    </div>
  );
}

export default AnswerList;
