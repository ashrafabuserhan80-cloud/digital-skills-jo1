export type Role = "STUDENT" | "TEACHER" | "ADMIN";

export type LessonType = "TEXT" | "VIDEO" | "INTERACTIVE" | "PRACTICAL" | "PROJECT";

export interface Grade {
  id: string;
  name: string;
  number: number;
  description?: string;
}

export interface Unit {
  id: string;
  gradeId: string;
  title: string;
  description?: string;
  domain: string;
  order: number;
  semester: number;
  icon?: string;
}

export interface Lesson {
  id: string;
  unitId: string;
  title: string;
  content: LessonContent;
  type: LessonType;
  duration: number;
  order: number;
}

export interface LessonContent {
  sections: LessonSection[];
  summary?: string;
  keyTerms?: { term: string; definition: string }[];
}

export interface LessonSection {
  title: string;
  content: string;
  imageUrl?: string;
  videoUrl?: string;
  codeExample?: string;
  tip?: string;
}

export interface Quiz {
  id: string;
  unitId: string;
  title: string;
  description?: string;
  questions: Question[];
  timeLimit?: number;
  passingScore: number;
}

export interface Question {
  id: string;
  type: "multiple-choice" | "true-false" | "fill-blank" | "drag-drop" | "essay";
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation?: string;
  points: number;
}

export interface QuizResult {
  id: string;
  userId: string;
  quizId: string;
  score: number;
  answers: Record<string, string | string[]>;
  timeTaken: number;
  completed: boolean;
  createdAt: Date;
}

export interface UserProgress {
  lessonId: string;
  completed: boolean;
  score?: number;
  timeSpent: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  points: number;
  criteria: {
    type: "points" | "lessons" | "quizzes" | "streak" | "level";
    target: number;
  };
}

export interface Domain {
  id: string;
  name: string;
  nameEn: string;
  icon: string;
  color: string;
  description: string;
}
