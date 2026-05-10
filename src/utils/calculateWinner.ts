/**
 * Determines the winner of a Tic-Tac-Toe game.
 * @param {Array} squares - An array of 9 strings (e.g., ['X', 'O', null, ...])
 * @returns {string|null} - Returns 'X', 'O', or null if no winner yet.
 */
function calculateWinner(squares: (string | null)[]): string | null {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    // Check if the first square is not empty and matches the next two
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
}

export default calculateWinner;