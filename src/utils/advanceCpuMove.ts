import type { squaresType } from "../types/types";

/**
 * Minimax Algorithm for Tic-Tac-Toe
 * It recursively evaluates all possible moves to find the optimal strategy.
 */
function getAdvancedMove(
  squares: squaresType,
  cpuPiece: string,
  humanPiece: string,
): number | null {
  const cpu = cpuPiece.toUpperCase() as "X" | "O";
  const human = humanPiece.toUpperCase() as "X" | "O";

  // 1. Helper: Check for winner in a specific board state
  const checkWinner = (board: squaresType) => {
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
    for (const [a, b, c] of lines) {
      if (board[a] && board[a] === board[b] && board[a] === board[c])
        return board[a];
    }
    if (!board.includes(null)) return "draw";
    return null;
  };

  // 2. The recursive Minimax function
  function minimax(
    board: squaresType,
    depth: number,
    isMaximizing: boolean,
  ): number {
    const result = checkWinner(board);

    // Base cases: return score based on outcome
    if (result === cpu) return 10 - depth; // Winning sooner is better
    if (result === human) return depth - 10; // Losing later is better
    if (result === "draw") return 0;

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < 9; i++) {
        if (board[i] === null) {
          board[i] = cpu;
          const score = minimax(board, depth + 1, false);
          board[i] = null; // Undo move
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < 9; i++) {
        if (board[i] === null) {
          board[i] = human;
          const score = minimax(board, depth + 1, true);
          board[i] = null; // Undo move
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
    }
  }

  // 3. Find the best starting move for the current board
  let bestScore = -Infinity;
  let move = null;

  // Optimization: If board is empty, take a corner or center immediately
  if (squares.every((s) => s === null)) return 4;

  for (let i = 0; i < 9; i++) {
    if (squares[i] === null) {
      const boardCopy = [...squares] as squaresType;
      boardCopy[i] = cpu;
      const score = minimax(boardCopy, 0, false);

      if (score > bestScore) {
        bestScore = score;
        move = i;
      }
    }
  }

  return move;
}

export default getAdvancedMove;
