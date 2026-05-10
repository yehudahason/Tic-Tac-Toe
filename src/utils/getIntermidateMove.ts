import type { squaresType} from '../types/types';

function getIntermediateMove(squares: squaresType, cpuPiece: string, humanPiece: string): number | null{
  const winLines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6],
    [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
  ];

  // Helper to find a move that completes a line
  const findKeyMove = (piece: string) => {
    for (let line of winLines) {
      const [a, b, c] = line;
      const values = [squares[a], squares[b], squares[c]];
      
      // If two squares have the piece and one is null
      if (values.filter(v => v === piece).length === 2 && values.includes(null)) {
        return line[values.indexOf(null)];
      }
    }
    return null;
  };

  // 1. Check if CPU can win right now
  const winMove = findKeyMove(cpuPiece);
  if (winMove !== null) return winMove;

  // 2. Check if CPU needs to block player from winning
  const blockMove = findKeyMove(humanPiece);
  if (blockMove !== null) return blockMove;

  // 3. Take the Center (index 4) if available
  if (squares[4] === null) return 4;

  // 4. Take an available Corner
  const corners = [0, 2, 6, 8];
  const availableCorners = corners.filter(i => squares[i] === null);
  if (availableCorners.length > 0) {
    return availableCorners[Math.floor(Math.random() * availableCorners.length)];
  }

  // 5. Take whatever is left (Edges)
  const availableMoves = squares.map((v, i) => v === null ? i : null).filter(v => v !== null);
  return availableMoves[Math.floor(Math.random() * availableMoves.length)];
}

export default getIntermediateMove;