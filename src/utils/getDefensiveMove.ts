import type { squaresType } from "../types/types";

function getDefensiveMove(
  squares: squaresType,
  cpuPiece: string,
  humanPiece: string,
): number | null {
  const cpu = cpuPiece.toUpperCase() as "X" | "O";
  const human = humanPiece.toUpperCase() as "X" | "O";

  const winLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Cols
    [0, 4, 8],
    [2, 4, 6], // Diagonals
  ];

  // Helper: Find moves that complete a line of 3
  const findWinningMove = (board: squaresType, piece: string) => {
    for (let line of winLines) {
      const [a, b, c] = line;
      const values = [board[a], board[b], board[c]];
      if (
        values.filter((v) => v === piece).length === 2 &&
        values.includes(null)
      ) {
        return line[values.indexOf(null)];
      }
    }
    return null;
  };

  // 1. PRIORITY: If CPU can win right now, take it.
  const winMove = findWinningMove(squares, cpu);
  if (winMove !== null) return winMove;

  // 2. DEFENSE: Block the human from winning (Immediate Threat)
  const blockMove = findWinningMove(squares, human);
  if (blockMove !== null) return blockMove;

  // 3. ADVANCED DEFENSE: Prevent the "Two-Way Win" (Fork Defense)
  // We simulate the human's next move. If a move gives them 2 ways to win, we take it first.
  for (let i = 0; i < 9; i++) {
    if (squares[i] === null) {
      const boardCopy = [...squares];
      boardCopy[i] = human; // "What if the human goes here?"

      // Count how many winning lines the human would have after this move
      let winningLinesCount = 0;
      for (let line of winLines) {
        const [a, b, c] = line;
        const values = [boardCopy[a], boardCopy[b], boardCopy[c]];
        if (
          values.filter((v) => v === human).length === 2 &&
          values.includes(null)
        ) {
          winningLinesCount++;
        }
      }

      if (winningLinesCount >= 2) {
        return i; // BLOCK THIS: It prevents a double-threat setup
      }
    }
  }

  // 4. STRATEGIC POSITIONING: If no immediate threats, take center
  if (squares[4] === null) return 4;

  // 5. COUNTER-DIAGONAL: If human has opposite corners, take an edge (not a corner)
  // This prevents a very specific common trick.
  if (
    (squares[0] === human && squares[8] === human) ||
    (squares[2] === human && squares[6] === human)
  ) {
    const edges = [1, 3, 5, 7];
    const availableEdges = edges.filter((i) => squares[i] === null);
    if (availableEdges.length > 0) return availableEdges[0];
  }

  // 6. TRADITIONAL: Take corners, then anything else
  const corners = [0, 2, 6, 8];
  const availableCorners = corners.filter((i) => squares[i] === null);
  if (availableCorners.length > 0) return availableCorners[0];

  const availableMoves = squares
    .map((v, i) => (v === null ? i : null))
    .filter((v) => v !== null);
  return availableMoves[0] ?? null;
}

export default getDefensiveMove;
