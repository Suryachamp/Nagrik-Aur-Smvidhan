import React, { useState } from "react";
import jsPDF from "jspdf";

const Module3 = ({ userName = "Piyush Sharma", courseName = "Article-14" }) => {
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState(new Array(5).fill(""));

  const questions = [
    {
      question: "Which article of the Indian Constitution guarantees the Right to Equality?",
      options: ["Article 14", "Article 21", "Article 19", "Article 32"],
      answer: "Article 14",
    },
    {
      question: "Directive Principles of State Policy are inspired by which country's Constitution?",
      options: ["USA", "Russia", "Ireland", "France"],
      answer: "Ireland",
    },
    {
      question: "Which article of the Indian Constitution lists the fundamental duties?",
      options: ["Article 21", "Article 51A", "Article 32", "Article 14"],
      answer: "Article 51A",
    },
    {
      question: "How many fundamental duties are mentioned in the Indian Constitution?",
      options: ["5", "10", "11", "12"],
      answer: "11",
    },
    {
      question: "Which of the following is both a Fundamental Right and a Directive Principle?",
      options: ["Right to Education", "Right to Property", "Right to Vote", "Right to Equality"],
      answer: "Right to Education",
    },
  ];

  const handleAnswerChange = (index, selectedOption) => {
    const newAnswers = [...userAnswers];
    newAnswers[index] = selectedOption;
    setUserAnswers(newAnswers);
  };

  const handleSubmitQuiz = () => {
    const correctAnswers = questions.filter((q, index) => q.answer === userAnswers[index]).length;
    const calculatedScore = (correctAnswers / questions.length) * 100;
    setScore(calculatedScore);
    setQuizCompleted(true);
  };

  const resetQuiz = () => {
    setQuizStarted(false);
    setQuizCompleted(false);
    setUserAnswers(new Array(questions.length).fill(""));
    setScore(0);
  };

  const generateCertificate = () => {
    const doc = new jsPDF("landscape");
  
    // Fetch and add an image from URL
    const imageUrl = "data:image/jpeg;base64,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"; // Replace with actual image URL
  
    const addImageToPDF = (base64Image) => {
      doc.addImage(base64Image, "JPEG", 0, 0, 297, 210); // Full page background
  
      // Title
      doc.setFont("helvetica", "bold");
      doc.setFontSize(30);
      doc.setTextColor(44, 62, 80);
      doc.text("Certificate of Completion", 80, 40);
  
      // User Name
      doc.setFontSize(18);
      doc.setTextColor(0, 0, 0);
      doc.text("This is to certify that", 110, 60);
  
      doc.setFont("times", "bold");
      doc.setFontSize(22);
      doc.setTextColor(231, 76, 60);
      doc.text(userName, 120, 80);
  
      // Course Name
      doc.setFont("helvetica", "normal");
      doc.setFontSize(18);
      doc.setTextColor(0, 0, 0);
      doc.text("has successfully completed the course", 90, 100);
  
      doc.setFontSize(20);
      doc.setFont("times", "bold");
      doc.setTextColor(41, 128, 185);
      doc.text(courseName, 100, 120);
  
      // Date & Instructor Signature
      doc.setFont("helvetica", "normal");
      doc.setFontSize(14);
      doc.setTextColor(0, 0, 0);
      doc.text(`Issued on: ${new Date().toDateString()}`, 20, 150);
      doc.text("Instructor: Dr. XYZ", 220, 150);
  
      // Signature Line
      doc.line(20, 170, 80, 170);
      doc.text("Signature", 35, 180);
  
      // Save PDF
      doc.save("Certificate_Article14.pdf");
    };
  
    // Convert the image URL to Base64
    const loadImageAsBase64 = (url) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        const reader = new FileReader();
        reader.onloadend = function () {
          addImageToPDF(reader.result);
        };
        reader.readAsDataURL(xhr.response);
      };
      xhr.open("GET", url);
      xhr.responseType = "blob";
      xhr.send();
    };
  
    loadImageAsBase64(imageUrl);
  };
  

  return (
    <div className="p-6 border rounded-lg shadow-lg bg-white max-w-2xl mx-auto">
      {!quizStarted ? (
        <>
<h2 className="text-xl font-bold mb-4">Module 3: Duties & Responsibilities</h2>
          <p className="mb-4">
            The Fundamental Duties of Indian citizens were added to the Constitution 
            through the 42nd Amendment Act in 1976. These duties remind citizens of their 
            moral obligations towards the nation and society. They serve as a constant 
            reminder that while enjoying their fundamental rights, citizens must also 
            fulfill their responsibilities.
          </p>
          <p className="mb-2 font-semibold">Key Fundamental Duties include:</p>
          <ul className="list-disc pl-5 mb-4">
            <li>Respecting the Constitution, National Flag, and National Anthem.</li>
            <li>Promoting harmony and spirit of common brotherhood.</li>
            <li>Defending the country and rendering national service when required.</li>
            <li>Protecting public property and avoiding violence.</li>
            <li>Developing a scientific temper and humanism.</li>
            <li>Safeguarding the environment, forests, lakes, and wildlife.</li>
          </ul>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
            onClick={() => setQuizStarted(true)}
          >
            Start Quiz
          </button>
        </>
      ) : !quizCompleted ? (
        <div>
          <h2 className="text-xl font-bold mb-4">Module 3 Quiz</h2>
          {questions.map((q, index) => (
            <div key={index} className="mb-4 p-4 border rounded bg-gray-100">
              <p className="font-semibold">{q.question}</p>
              {q.options.map((option) => (
                <label key={option} className="block cursor-pointer">
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value={option}
                    checked={userAnswers[index] === option}
                    onChange={() => handleAnswerChange(index, option)}
                    className="mr-2"
                  />
                  {option}
                </label>
              ))}
            </div>
          ))}
          <button
            className="mt-4 px-4 py-2 bg-green-500 text-white font-semibold rounded hover:bg-green-600 transition duration-300"
            onClick={handleSubmitQuiz}
          >
            Submit Quiz
          </button>
        </div>
      ) : score >= 75 ? (
        <div className="text-center">
          <h2 className="text-xl font-bold text-green-600">🎉 Congratulations! You scored {score}%</h2>
          <p className="mt-2">You can now download your certificate.</p>
          <button
            className="mt-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition duration-300"
            onClick={generateCertificate}
          >
            Download Certificate
          </button>
          <button
            className="mt-4 ml-2 px-4 py-2 bg-gray-500 text-white font-semibold rounded hover:bg-gray-600 transition duration-300"
            onClick={resetQuiz}
          >
            Retake Module
          </button>
        </div>
      ) : (
        <div className="text-center">
          <h2 className="text-xl font-bold text-red-600">You scored {score}%. Try Again!</h2>
          <button
            className="mt-4 px-4 py-2 bg-orange-500 text-white font-semibold rounded hover:bg-orange-600 transition duration-300"
            onClick={resetQuiz}
          >
            Retake Quiz
          </button>
        </div>
      )}
    </div>
  );
};

export default Module3;