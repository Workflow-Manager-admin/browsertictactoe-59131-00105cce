//
// ticTacToeLogic.js - Minimal, functional game logic for tic-tac-toe
//

// PUBLIC_INTERFACE
export function calculateWinner(squares) {
  /** Determines if there is a winner in the current squares setup.
      Returns 'X', 'O', or null if no winner.
  */
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      return squares[a];
    }
  }
  return null;
}

// PUBLIC_INTERFACE
export function isDraw(squares) {
  /** Returns true if all squares are filled and there is no winner. */
  return squares.every(square => square) && !calculateWinner(squares);
}
