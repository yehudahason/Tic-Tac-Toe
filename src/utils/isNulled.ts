import type { squaresType } from "../types/types";

export default function isNulled(squares: squaresType) {
  return squares.every((square) => square === null);
}
