import type { Question, QuestionResponse } from "../types/gameTypes";

export function transformQuestions(response: QuestionResponse[]): Question[] {
    return response.map((q) => ({
        id: q.id,
        question: q.text,
        answers: q.answers,
        correctAnswer: q.correct_answer,
    }));
}