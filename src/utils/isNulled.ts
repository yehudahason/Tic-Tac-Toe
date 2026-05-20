import type { squaresType } from "../types";

export default function isNulled(squares: squaresType) {
  return squares.every((square) => square === null);
}
