import getGameState from "./getGameState";
import type { squaresType } from "../types/types";

/**
 * Intermediate CPU Logic:
 * 1. Checks if it can win immediately.
 * 2. Blocks the opponent if they are about to win.
 * 3. Takes the center if available.
 * 4. Takes an available corner.
 * 5. Fallback to any remaining edge.
 */
const interCpuMove = (
  squares: squaresType,
  cpuPiece: string,
  humanPiece: string,
): number | null => {
  const cpu = cpuPiece.toUpperCase() as "X" | "O";
  const human = humanPiece.toUpperCase() as "X" | "O";

  const emptyIndices = squares
    .map((val, idx) => (val === null ? idx : null))
    .filter((val): val is number => val !== null);

  // Guard against full board
  if (emptyIndices.length === 0) return null;

  // Helper for safe random selection
  const pickRandom = (arr: number[]): number | null => {
    if (arr.length === 0) return null;
    return arr[Math.floor(Math.random() * arr.length)];
  };

  // 1. OFFENSIVE CHECK: Can the CPU win in the next move?
  for (const index of emptyIndices) {
    const squaresCopy = [...squares] as squaresType;
    squaresCopy[index] = cpu;
    const simulatedState = getGameState(squaresCopy);
    if (simulatedState.status === "winner" && simulatedState.winner === cpu) {
      return index;
    }
  }

  // 2. BLOCKING CHECK: Is the human about to win?
  for (const index of emptyIndices) {
    const squaresCopy = [...squares] as squaresType;
    squaresCopy[index] = human;
    const simulatedState = getGameState(squaresCopy);
    if (simulatedState.status === "winner" && simulatedState.winner === human) {
      return index;
    }
  }

  // 3. CENTER CHECK: Strategic priority
  if (emptyIndices.includes(4)) {
    return 4;
  }

  // 4. CORNER CHECK: Strategic secondary priority
  const corners = [0, 2, 6, 8];
  const availableCorners = corners.filter((index) =>
    emptyIndices.includes(index),
  );
  const cornerMove = pickRandom(availableCorners);
  if (cornerMove !== null) return cornerMove;

  // 5. RANDOM FALLBACK (Edges):
  return pickRandom(emptyIndices);
};

export default interCpuMove;
