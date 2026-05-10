import calculateWinner from './calculateWinner';
import type { gameStateType, squaresType } from '../types/types';
/**
 * Processes a move and returns the updated game state.
 */
function getGameState(squares: squaresType): gameStateType {
  const winner = calculateWinner(squares);
  
  if (winner) {
    return { status: 'winner', winner: winner };
  }

  // If there's no winner and no nulls left, it's a draw
  if (!squares.includes(null)) {
    return { status: 'draw' };
  }

  return { status: 'ongoing' };
}

export default getGameState;