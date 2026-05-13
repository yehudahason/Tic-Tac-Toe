import calculateWinner from "./calculateWinner";
import type { moveType, squaresType } from "../types/types";

function minimax(
  board: squaresType,
  player: "X" | "O",
  cpuPlayer: "X" | "O",
  humanPlayer: "X" | "O",
): moveType {
  const winner = calculateWinner(board);
  if (winner === cpuPlayer) return { score: 10 };
  if (winner === humanPlayer) return { score: -10 };
  if (!board.includes(null)) return { score: 0 };

  const moves: moveType[] = [];

  for (let i = 0; i < board.length; i++) {
    if (board[i] === null) {
      board[i] = player; // Simulate move

      // Determine score recursively
      const result = minimax(
        board,
        player === cpuPlayer ? humanPlayer : cpuPlayer,
        cpuPlayer,
        humanPlayer,
      );

      moves.push({ index: i, score: result.score });
      board[i] = null; // Backtrack
    }
  }

  let bestMoveIndex = 0;
  if (player === cpuPlayer) {
    let bestScore = -Infinity;
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].score > bestScore) {
        bestScore = moves[i].score;
        bestMoveIndex = i;
      }
    }
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].score < bestScore) {
        bestScore = moves[i].score;
        bestMoveIndex = i;
      }
    }
  }

  return moves[bestMoveIndex];
}

export default minimax;
