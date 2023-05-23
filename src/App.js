import { useState, useEffect } from "react";
import { convert } from "html-to-text";
import { nanoid } from "nanoid";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";

export default function App() {
  const [newGame, setNewGame] = useState(true);
  const [checkAnswers, setCheckAnswers] = useState(true);
  const [questionData, setQuestionData] = useState([]);
  const [correct, setCorrect] = useState(0);
  const [play, setPlay] = useState(false);

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5")
      .then((res) => res.json())
      .then((data) => {
        setQuestionData(
          data.results.map((ele) => {
            const answers = [...ele.incorrect_answers, ele.correct_answer];

            for (let i = answers.length - 1; i > 0; i--) {
              const rand = Math.floor(Math.random() * (i + 1));
              let temp = answers[i];
              answers[i] = answers[rand];
              answers[rand] = temp;
            }

            return {
              question: ele.question,
              correct_answer: ele.correct_answer,
              answers: answers,
              id: nanoid(),
              userSelection: "",
            };
          })
        );
      });
  }, [play]);

  function handleGame() {
    setNewGame(false);
  }

  function showScore() {
    setCheckAnswers(false);
    const correctAnswers = questionData.filter((data) => {
      return data.correct_answer === data.userSelection;
    });

    setCorrect(correctAnswers.length);
  }

  function playAgain() {
    setCheckAnswers(true);
    setPlay((prevPlay) => !prevPlay);
  }

  function answerChoice(ans, id) {
    setQuestionData((prevData) => {
      return prevData.map((data) => {
        return data.id === id
          ? {
              ...data,
              userSelection: ans,
            }
          : data;
      });
    });
  }

  const questionElements = questionData.map((question) => {
    return (
      <Question
        key={question.id}
        id={question.id}
        question={convert(question.question)}
        answers={question.answers}
        answerChoice={answerChoice}
        userSelection={question.userSelection}
        check={checkAnswers}
        correctAnswer={question.correct_answer}
      />
    );
  });

  return (
    <main>
      {newGame && <StartScreen handleGame={handleGame} />}
      {!newGame && (
        <div className="trivia-board">
          {questionElements}

          {checkAnswers ? (
            <div className="answer-check">
              <button onClick={showScore} className="check-button">
                Check answers
              </button>
            </div>
          ) : (
            <div className="answer-check">
              <h3 className="score">You scored {correct}/5 correct answers</h3>
              <button onClick={playAgain} className="check-button">
                Play again
              </button>
            </div>
          )}
        </div>
      )}
    </main>
  );
}
