export default function StartScreen(props) {
  return (
    <div className="start-screen">
      <h1 className="start-title">Quizzical</h1>
      <h3 className="start-description">Trivia Game</h3>
      <button className="start-button" onClick={props.handleGame}>
        Start quiz
      </button>
    </div>
  );
}
