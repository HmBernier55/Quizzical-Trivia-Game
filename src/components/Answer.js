export default function Answer(props) {
  const styles = {
    backgroundColor: props.check
      ? props.userSelection
        ? "#D6DBF5"
        : "#F5F7FB"
      : props.userSelection
      ? "#94D7A2"
      : props.ans === props.correctAnswer
      ? "#F8BCBC"
      : "#F5F7FB",
    border: props.check
      ? props.userSelection
        ? "none"
        : "0.8px solid #4D5B9E"
      : props.userSelection
      ? "none"
      : props.ans === props.correctAnswer
      ? "none"
      : "0.8px solid #4D5B9E",
    opacity: props.check ? "1" : props.userSelection ? "1" : "0.5",
  };

  return (
    <button
      style={styles}
      onClick={() => props.answerChoice(props.ans, props.id)}
      className="answer-button"
    >
      {props.ans}
    </button>
  );
}
