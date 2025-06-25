import React from "react";
import "./TicTacToe.css";
import { calculateWinner, isDraw } from "./ticTacToeLogic";

// PUBLIC_INTERFACE
function Square({ value, onClick, disabled, accent, primary, secondary }) {
  /** Minimal square component for the board; uses supplied colors. */
  return (
    <button
      className="ttt-square"
      style={{
        color: value === "X" ? primary : secondary,
        borderColor: accent,
        background: "#fff",
        cursor: disabled ? "not-allowed" : "pointer"
      }}
      onClick={onClick}
      disabled={disabled}
      aria-label={value ? `Square ${value}` : "Empty square"}
    >
      {value}
    </button>
  );
}

// PUBLIC_INTERFACE
function Board({ squares, onSquareClick, gameOver, theme }) {
  /** Renders a 3x3 tic tac toe grid with clickable squares. */
  const { accent, primary, secondary } = theme;
  return (
    <div className="ttt-board">
      {squares.map((sq, i) => (
        <Square
          key={i}
          value={sq}
          onClick={() => onSquareClick(i)}
          disabled={!!sq || gameOver}
          accent={accent}
          primary={primary}
          secondary={secondary}
        />
      ))}
    </div>
  );
}

// PUBLIC_INTERFACE
function StatusDisplay({ winner, isDraw, xIsNext }) {
  /** Shows game status: turn, win or draw. */
  let status = "";
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (isDraw) {
    status = "It's a draw!";
  } else {
    status = `Next Turn: ${xIsNext ? "X" : "O"}`;
  }
  return <div className="ttt-status">{status}</div>;
}

// PUBLIC_INTERFACE
function ResetButton({ onReset, accent }) {
  /** Simple reset button. */
  return (
    <button
      className="ttt-reset"
      style={{
        background: accent,
        color: "#222",
        borderRadius: "6px",
        border: "none",
        padding: "0.75em 1.5em",
        fontWeight: 600,
        cursor: "pointer",
        marginTop: "1em"
      }}
      onClick={onReset}
    >
      Reset Game
    </button>
  );
}

// PUBLIC_INTERFACE
export default function TicTacToe({ theme }) {
  /**
   * Main container for handling state and rendering TTT game.
   * @param theme: {primary, secondary, accent}
   */
  const [squares, setSquares] = React.useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = React.useState(true);

  const winner = calculateWinner(squares);
  const draw = isDraw(squares);

  // PUBLIC_INTERFACE
  function handleSquareClick(idx) {
    if (squares[idx] || winner) return; // ignore if filled or over
    const nextSquares = [...squares];
    nextSquares[idx] = xIsNext ? "X" : "O";
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  // PUBLIC_INTERFACE
  function handleReset() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  return (
    <div className="ttt-outer">
      <h1 className="ttt-title" style={{ color: theme.primary }}>Tic Tac Toe</h1>
      <Board
        squares={squares}
        onSquareClick={handleSquareClick}
        gameOver={!!winner || draw}
        theme={theme}
      />
      <StatusDisplay winner={winner} isDraw={draw} xIsNext={xIsNext} />
      <ResetButton onReset={handleReset} accent={theme.accent} />
    </div>
  );
}
