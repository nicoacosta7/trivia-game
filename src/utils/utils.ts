import type { Question, QuestionResponse } from "../types/gameTypes";

export function transformQuestions(response: QuestionResponse[]): Question[] {
    return response.map((q) => ({
        id: q.id,
        question: q.text,
        answers: q.answers,
        correctAnswer: q.correct_answer,
    }));
}

export function getRandomQuestions(questions: Question[], count: number): Question[] {
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
}