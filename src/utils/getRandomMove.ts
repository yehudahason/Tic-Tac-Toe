function getRandomMove(squares: (string | null)[]): number | null{
  const availableMoves = squares
    .map((val, idx) => (val === null ? idx : null))
    .filter((val) => val !== null);

  const randomIndex = Math.floor(Math.random() * availableMoves.length);
  return availableMoves[randomIndex];
}

export default getRandomMove;