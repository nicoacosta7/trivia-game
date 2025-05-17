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
    currentScore: number;
    currentIndex: number;
    totalQuestions: number;
}

interface AnswerListProps {
    answers: string[];
    selected: string | null;
    correctAnswer: string;
    onAnswer: (answer: string) => void;
  }

export type { ButtonProps, QuestionCardProps, AnswerListProps };