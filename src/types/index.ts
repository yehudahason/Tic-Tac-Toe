export type moveType = { index?: number; score: number };
export type squaresType = ("X" | "O" | null)[];
export type gameStateType = {
  status: "notStarted" | "ongoing" | "draw" | "winner" | "stopped";
  winner: "X" | "O" | "draw" | null;
  line: number[] | null;
};
export type playType = {
  player: "X" | "O";
  against: "P2" | "CPU";
  difficulty: "EASY" | "MEDIUM" | "HARD";
};
export type players = "YOU" | "P1" | "CPU" | "P2";
export type results = {
  X: number;
  O: number;
  draw: number;
};

export type winner = { winner: "X" | "O" | "draw" | null; line: number[] };
