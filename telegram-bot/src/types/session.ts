export interface Question {
  questionId: number;
  question: string;
  options: string[] | string;
  topic?: string;
  correct?: string;
  explanation?: string;
}

export interface QuizSession {
  quizId: number;
  questions: Question[];
  currentIndex: number;
  answers: { [questionId: number]: string };
}

export interface ProgressRecord {
  quizId: number;
  score: number;
  total: number;
  percentage: number;
  date: Date;
}

export interface SessionData {
  userId?: string;
  grade?: number;
  selectedSubject?: number;
  selectedLesson?: number;
  currentQuiz?: QuizSession;
  awaitingAnswer?: boolean;
  awaitingQuestionIndex?: number;
  progressHistory?: ProgressRecord[];
  reportSubjects?: any[]; 
   paymentSuccess?: boolean;  // for storing subjects in report flow
}

