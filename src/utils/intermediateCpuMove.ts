import getGameState from "./getGameState";
import type { squaresType } from "../types/types";

/**
 * Intermediate CPU Logic:
 * 1. Checks if it can win immediately.
 * 2. Blocks the opponent if they are about to win.
 * 3. Otherwise, chooses a random available square.
 */
const interCpuMove = (
  squares: squaresType,
  cpuPiece: string,
  humanPiece: string,
): number | null => {
  // Standardize pieces to match the game logic (usually uppercase)
  const cpu = cpuPiece.toUpperCase() as "X" | "O";
  const human = humanPiece.toUpperCase() as "X" | "O";

  // Get all available indices
  const emptyIndices = squares
    .map((val, idx) => (val === null ? idx : null))
    .filter((val): val is number => val !== null);

  if (emptyIndices.length === 0) return null;

  // 1. OFFENSIVE CHECK: Can the CPU win in the next move?
  for (const index of emptyIndices) {
    const squaresCopy = [...squares] as squaresType;
    squaresCopy[index] = cpu;

    const simulatedState = getGameState(squaresCopy);
    if (
      simulatedState.status === "winner" &&
      simulatedState.winner?.toUpperCase() === cpu
    ) {
      return index;
    }
  }

  // 2. BLOCKING CHECK: Is the human about to win?
  for (const index of emptyIndices) {
    const squaresCopy = [...squares] as squaresType;
    squaresCopy[index] = human;

    const simulatedState = getGameState(squaresCopy);
    if (
      simulatedState.status === "winner" &&
      simulatedState.winner?.toUpperCase() === human
    ) {
      return index;
    }
  }

  // 3. RANDOM FALLBACK:
  const randomIndex = Math.floor(Math.random() * emptyIndices.length);
  return emptyIndices[randomIndex];
};

export default interCpuMove;
