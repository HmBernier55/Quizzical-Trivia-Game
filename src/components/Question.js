import { convert } from "html-to-text";
import Answer from "./Answer";

export default function Question(props) {
  const answerElements = props.answers.map((answer) => {
    return (
      <Answer
        id={props.id}
        ans={convert(answer)}
        answerChoice={props.answerChoice}
        user={props.userSelection}
        userSelection={props.userSelection === answer ? true : false}
        check={props.check}
        correctAnswer={props.correctAnswer}
      />
    );
  });

  return (
    <div className="question">
      <h2 className="question-title">{props.question}</h2>
      <div className="answers">{answerElements}</div>
      <hr />
    </div>
  );
}
