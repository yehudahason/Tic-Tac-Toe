 export type moveType = { index?: number; score: number }
 export type squaresType = (string | null)[];
 export type gameStateType = { status: "notStarted" | "ongoing" | "draw" | "winner"; winner?: string };
 export type playType = { player: "x"|"o"; against: "player"|"cpu" };