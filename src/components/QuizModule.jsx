import { useState } from "react";
import Certificate from "./Certificate";

const QuizModule = ({ userName, courseName, walletAddress }) => {
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const questions = [
    {
      question: "Which article guarantees Right to Equality?",
      options: ["Article 14", "Article 21", "Article 19", "Article 32"],
      answer: "Article 14",
    },
    {
      question: "Fundamental Duties are under which article?",
      options: ["Article 51A", "Article 21", "Article 32", "Article 14"],
      answer: "Article 51A",
    },
  ];

  const handleSubmit = () => {
    const correctAnswers = questions.filter((q) => q.answer === q.selected).length;
    const calculatedScore = (correctAnswers / questions.length) * 100;
    setScore(calculatedScore);
    setQuizCompleted(true);
  };

  return (
    <div className="p-6 border rounded bg-white shadow-lg">
      <h2 className="text-xl font-bold mb-4">Quiz</h2>
      {questions.map((q, index) => (
        <div key={index} className="mb-4">
          <p className="font-semibold">{q.question}</p>
          {q.options.map((option) => (
            <label key={option} className="block">
              <input
                type="radio"
                name={`q${index}`}
                value={option}
                onChange={() => (q.selected = option)}
                className="mr-2"
              />
              {option}
            </label>
          ))}
        </div>
      ))}
      <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={handleSubmit}>
        Submit Quiz
      </button>
      {quizCompleted && score >= 75 && (
        <Certificate userName={userName} courseName={courseName} walletAddress={walletAddress} />
      )}
    </div>
  );
};

export default QuizModule;