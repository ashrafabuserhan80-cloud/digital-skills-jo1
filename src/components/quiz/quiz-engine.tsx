"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Question } from "@/types";

interface QuizEngineProps {
  title: string;
  questions: Question[];
  timeLimit?: number;
  passingScore: number;
  onComplete: (score: number, answers: Record<string, string | string[]>, timeTaken: number) => void;
}

export function QuizEngine({ title, questions, timeLimit, passingScore, onComplete }: QuizEngineProps) {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [timeLeft, setTimeLeft] = useState(timeLimit ? timeLimit * 60 : 0);
  const [submitted, setSubmitted] = useState(false);
  const [startTime] = useState(Date.now());

  const calculateScore = useCallback(() => {
    let totalPoints = 0;
    let earnedPoints = 0;
    questions.forEach((q) => {
      totalPoints += q.points;
      const answer = answers[q.id];
      if (answer) {
        if (Array.isArray(q.correctAnswer)) {
          if (Array.isArray(answer) && answer.length === q.correctAnswer.length && answer.every((a) => q.correctAnswer.includes(a))) {
            earnedPoints += q.points;
          }
        } else if (answer === q.correctAnswer) {
          earnedPoints += q.points;
        }
      }
    });
    return totalPoints > 0 ? (earnedPoints / totalPoints) * 100 : 0;
  }, [questions, answers]);

  useEffect(() => {
    if (timeLimit && timeLeft > 0 && !submitted) {
      const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
      return () => clearInterval(timer);
    }
    if (timeLeft === 0 && !submitted && timeLimit) {
      handleSubmit();
    }
  }, [timeLeft, submitted, timeLimit]);

  const handleSubmit = () => {
    const score = calculateScore();
    const timeTaken = Math.floor((Date.now() - startTime) / 1000);
    setSubmitted(true);
    onComplete(score, answers, timeTaken);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const question = questions[currentQ];

  return (
    <div className="max-w-3xl mx-auto">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{title}</CardTitle>
            {timeLimit && (
              <Badge variant={timeLeft < 60 ? "destructive" : "secondary"} className="text-lg font-mono">
                ⏱ {formatTime(timeLeft)}
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>السؤال {currentQ + 1} من {questions.length}</span>
            <div className="flex-1 bg-gray-200 rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {!submitted ? (
            <>
              <div className="mb-6">
                <Badge variant="outline" className="mb-3">{question.points} نقاط</Badge>
                <h3 className="text-lg font-bold mb-4">{question.question}</h3>

                {question.type === "multiple-choice" && question.options && (
                  <div className="space-y-3">
                    {question.options.map((option, i) => (
                      <button
                        key={i}
                        onClick={() => setAnswers({ ...answers, [question.id]: option })}
                        className={`w-full text-right p-4 rounded-lg border-2 transition-all duration-200 ${
                          answers[question.id] === option
                            ? "border-primary bg-primary/5 font-medium"
                            : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        <span className="ml-2 text-gray-400">
                          {String.fromCharCode(65 + i)})
                        </span>
                        {option}
                      </button>
                    ))}
                  </div>
                )}

                {question.type === "true-false" && (
                  <div className="flex gap-4">
                    {["صحيح", "خطأ"].map((option) => (
                      <button
                        key={option}
                        onClick={() => setAnswers({ ...answers, [question.id]: option })}
                        className={`flex-1 p-4 rounded-lg border-2 transition-all duration-200 font-bold ${
                          answers[question.id] === option
                            ? option === "صحيح"
                              ? "border-green-500 bg-green-50 text-green-700"
                              : "border-red-500 bg-red-50 text-red-700"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        {option === "صحيح" ? "✅" : "❌"} {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => setCurrentQ(Math.max(0, currentQ - 1))}
                  disabled={currentQ === 0}
                >
                  → السابق
                </Button>
                {currentQ < questions.length - 1 ? (
                  <Button onClick={() => setCurrentQ(currentQ + 1)}>
                    التالي ←
                  </Button>
                ) : (
                  <Button variant="gradient" onClick={handleSubmit}>
                    📤 تسليم الاختبار
                  </Button>
                )}
              </div>
            </>
          ) : (
            <div className="text-center py-8">
              <div className="text-6xl mb-4">
                {calculateScore() >= passingScore ? "🎉" : "😔"}
              </div>
              <h3 className="text-2xl font-bold mb-2">
                {calculateScore() >= passingScore ? "أحسنت! نجحت" : "حاول مرة أخرى"}
              </h3>
              <p className="text-4xl font-bold text-primary my-4">
                {Math.round(calculateScore())}%
              </p>
              <p className="text-gray-500 mb-6">
                النسبة المطلوبة: {passingScore}%
              </p>
              <Button variant="gradient" onClick={() => window.location.reload()}>
                🔄 إعادة المحاولة
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
