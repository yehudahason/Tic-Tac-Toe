export type moveType = { index?: number; score: number };
export type squaresType = (string | null)[];
export type gameStateType = {
  status: "notStarted" | "ongoing" | "draw" | "winner";
  winner?: string;
};
export type playType = { player: "X" | "O"; against: "P2" | "CPU" };
export type players = "YOU" | "P1" | "CPU" | "P2";
