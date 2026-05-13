import { useEffect } from "react";
import {
  type gameStateType,
  type playType,
  type squaresType,
} from "../types/types";

export default function RestartBanner({
  setGameState,
  setTurn,
  setSquares,
}: {
  gameState: gameStateType;
  setGameState: React.Dispatch<React.SetStateAction<gameStateType>>;
  play: playType;
  setTurn: React.Dispatch<React.SetStateAction<string>>;
  setSquares: React.Dispatch<React.SetStateAction<squaresType>>;
}) {
  const nextRound = () => {
    document.body.classList.remove("end");
    setSquares(Array(9).fill(null));
    setTurn("x");
    setGameState({ status: "ongoing", winner: "draw" }); // Reset status
  };

  function endGame() {
    document.body.classList.remove("end");
    window.location.reload();
    setGameState({ status: "notStarted", winner: "draw" });
  }
  useEffect(() => {
    document.body.classList.add("end");
    return () => {
      document.body.classList.remove("end");
    };
  }, []);
  return (
    <section className="end-game-banner">
      <p className="restart-msg">RESTART GAME?</p>

      <div className="end-btn">
        <button type="button" onClick={(_) => nextRound()}>
          NO CANCEL
        </button>
        <button type="button" onClick={(_) => endGame()}>
          YES RESTART
        </button>
      </div>
    </section>
  );
}
