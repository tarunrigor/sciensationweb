export interface Option {
  id: string;
  text: string;
}

export interface Question {
  id: number;
  text: string;
  context?: string;
  options: Option[];
}

export interface QuestionRubric {
  questionId: number;
  scoring: Record<string, number>;
  feedback: Record<string, string>;
}

export interface QuizData {
  questions: Question[];
  rubric: QuestionRubric[];
  maxScorePerQuestion: number;
}

export interface QuizLocale {
  ui: {
    eyebrow: string;
    heroLine1: string;
    heroLine2: string;
    subtitle: string;
    startButton: string;
    previous: string;
    next: string;
    seeResults: string;
    questionOf: (current: number, total: number) => string;
    answeredOf: (answered: number, total: number) => string;
    yourResult: string;
    breakdownEyebrow: string;
    breakdownHeading: string;
    question: (n: number) => string;
    yourAnswer: string;
    feedback: string;
    retake: string;
    exploreFellowship: string;
    backToHome: string;
    scoreLabels: {
      exceptional: string;
      strong: string;
      developing: string;
      emerging: string;
    };
    insights: {
      exceptional: string;
      strong: string;
      developing: string;
      emerging: string;
    };
  };
  data: QuizData;
}
