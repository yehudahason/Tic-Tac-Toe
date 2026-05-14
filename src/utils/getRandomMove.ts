// Returns a random available move from the squares array

function getRandomMove(squares: (string | null)[]): number | null {
  const availableMoves = squares
    .map((val, idx) => (val === null ? idx : null))
    .filter((val) => val !== null);

  const randomIndex = Math.floor(Math.random() * availableMoves.length);
  if (availableMoves.length === 0) return null;
  return availableMoves[randomIndex];
}

export default getRandomMove;
