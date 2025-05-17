import type { Question } from "./gameTypes";

interface ButtonProps {
    text: string;
    to: string;
}

interface QuestionCardProps {
    question: Question;
    onAnswer: (answer: string) => void;
    selected: string;
    timer: number;
    currentScoreP1: number;
    currentScoreP2: number | null;
    currentIndex: number;
    totalQuestions: number;
    player1: string;
    player2: string | null;
}

interface AnswerListProps {
    answers: string[];
    selected: string | null;
    correctAnswer: string;
    onAnswer: (answer: string) => void;
}

interface LoaderProps {
    message: string;
}

interface CountDownProps {
    countdown: string;
}

export type { ButtonProps, QuestionCardProps, AnswerListProps, LoaderProps, CountDownProps };