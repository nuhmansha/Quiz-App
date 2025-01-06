import React, { useState, useEffect } from "react";
import Option from "../components/Option";
import QuestionNumber from "../components/QuestionNumber";
import axiosInstance from "../Instance/axiosinstance";

const QuizApp = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axiosInstance.get("/questions");
        setQuestions(response.data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };
    fetchQuestions();
  }, []);

  // Loading state for questions
  if (!questions.length) return <div>Loading...</div>;

  const current = questions[currentQuestion];

  const handleSubmit = async () => {
    if (selectedAnswer === null) return alert("Please select an answer!");

    try {
      const response = await axiosInstance.post("/submit", {
        questionId: current._id,
        selectedAnswer,
      });

      setCorrectAnswer(response.data.correctAnswer);
      setShowResult(true);
      setShowExplanation(true);
    } catch (error) {
      console.error(
        "Error submitting answer:",
        error.response?.data || error.message
      );
    }
  };

  const handleNavigation = (direction) => {
    const newQuestion =
      direction === "prev"
        ? Math.max(currentQuestion - 1, 0)
        : Math.min(currentQuestion + 1, questions.length - 1);

    setCurrentQuestion(newQuestion);
    resetState();
  };

  const resetState = () => {
    setSelectedAnswer(null);
    setShowResult(false);
    setCorrectAnswer(null);
    setShowExplanation(false);
  };

  return (
    <div className="min-h-screen bg-blue-500 flex flex-col items-center justify-start p-4">
      {/* Header - Outside the quiz content */}
      <div className="bg-white rounded-xl shadow-lg w-full max-w-4xl mb-6 p-4">
        <h1 className="text-rose-500 text-2xl font-bold text-center mb-8">
          Quiz Application UI
        </h1>
      </div>

      {/* Main Quiz Container */}
      <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full p-6 flex flex-col lg:flex-row">
        {/* Main Quiz Content (Left Side) */}
        <div className="flex-1">
          <h2 className="text-lg font-medium mb-2 text-center">
            {current.question}
          </h2>
          {current.options.map((option, index) => (
            <Option
              key={index}
              text={option}
              isSelected={selectedAnswer === index}
              isCorrect={showResult && index === correctAnswer}
              isWrong={
                showResult &&
                selectedAnswer === index &&
                selectedAnswer !== correctAnswer
              }
              showResult={showResult}
              onClick={() => !showResult && setSelectedAnswer(index)}
            />
          ))}
          <button
            className="bg-gray-200 px-4 py-2 rounded-md mb-4 hover:bg-gray-300"
            onClick={handleSubmit}
            disabled={showResult}
          >
            Submit Answer
          </button>
          {showExplanation && (
            <div className="mt-4">
              <h3 className="text-lg font-bold text-blue-600">Explanation:</h3>
              <p className="text-gray-700 mt-2">{current.explanation}</p>
            </div>
          )}
          <div className="flex justify-between mt-4 w-full">
            <button
              className="bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300"
              onClick={() => handleNavigation("prev")}
              disabled={currentQuestion === 0}
            >
              Prev
            </button>
            <button
              className="bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300"
              onClick={() => handleNavigation("next")}
              disabled={currentQuestion === questions.length - 1}
            >
              Next
            </button>
          </div>
        </div>

        {/* Question Numbers (Right Side) */}
        <div
          className="    ml-0 lg:ml-4 mt-6 lg:mt-0 w-full lg:w-64 shadow-lg bg-white rounded-lg p-4">
          <div className="grid grid-cols-5 gap-4">
            {questions.map((_, index) => (
              <QuestionNumber
                key={index}
                number={index + 1}
                isActive={currentQuestion === index}
                onClick={() => {
                  setCurrentQuestion(index);
                  resetState();
                }}
                currentQuestion={currentQuestion}
                totalQuestions={questions.length}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizApp;
