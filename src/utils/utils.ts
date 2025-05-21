import type { Question, QuestionResponse } from "../types/gameTypes";
 
function transformQuestions(response: QuestionResponse[]): Question[] {
    return response.map((q) => ({
        id: q.id,
        question: q.text,
        answers: q.answers,
        correctAnswer: q.correct_answer,
    }));
}

function getRandomQuestions(questions: Question[], count: number): Question[] {
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
}

export async function getQuestions(questionCount: number) {
    try {
        const url = import.meta.env.VITE_QUESTIONS_URL;

        const response = await fetch(url || "");

        if (!response.ok) {
            throw new Error("Error al obtener preguntas");
        }

        const data = await response.json();
        const transformedQuestions = transformQuestions(data);
        return getRandomQuestions(transformedQuestions, questionCount);
    } catch (error) {
        console.error("Error al obtener preguntas:", error);
    }
}