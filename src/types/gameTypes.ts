export interface Question {
    id: number;
    question: string;
    answers: string[];
    correctAnswer: string;
}

export interface QuestionResponse {
    id: number;
    text: string;
    answers: string[];
    correct_answer: string;
    created_at: string;
}

export interface ClassicModeProps {
    questionCount: number;
    timePerQuestion: number;
}