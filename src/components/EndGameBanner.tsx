import { useEffect, useState } from "react";
import {
  type gameStateType,
  type playType,
  type squaresType,
} from "../types/types";

export default function EndGameBanner({
  gameState,
  setGameState,
  play,
  setTurn,
  setSquares,
}: {
  gameState: gameStateType;
  setGameState: React.Dispatch<React.SetStateAction<gameStateType>>;
  play: playType;
  setTurn: React.Dispatch<React.SetStateAction<string>>;
  setSquares: React.Dispatch<React.SetStateAction<squaresType>>;
}) {
  const baseUrl = import.meta.env.BASE_URL;
  const [winner, setWinner] = useState<string>("");
  const nextRound = () => {
    document.body.classList.remove("end");
    setSquares(Array(9).fill(null));
    setTurn("x");
    setGameState({ status: "ongoing", winner: "draw", line: null }); // Reset status
  };
  function endGame() {
    document.body.classList.remove("end");
    window.location.reload();
    setGameState({ status: "notStarted", winner: "draw", line: null });
    localStorage.setItem("tic-tac-toe-results", "");
  }

  useEffect(() => {
    const { winner } = gameState;
    const { against, player } = play;

    // 1. Handle Draw immediately
    if (winner === "draw") {
      setWinner("ROUND TIED");
      return;
    }

    // 2. Stop if there's no winner yet
    if (!winner) return;

    const isPlayer1Winner = winner === player;

    if (against === "CPU") {
      setWinner(isPlayer1Winner ? "YOU WON!" : "OH NO, YOU LOST...");
    } else {
      setWinner(isPlayer1Winner ? "PLAYER 1 WINS!" : "PLAYER 2 WINS!");
    }
  }, [play, gameState]);

  useEffect(() => {
    document.body.classList.add("end");
    return () => {
      document.body.classList.remove("end");
    };
  }, []);
  return (
    <section className="end-game-banner">
      <p className="winner">{winner}</p>
      <div className={`takes ${gameState.winner}`}>
        {gameState.winner !== "draw" && (
          <>
            <img
              src={`${baseUrl}/assets/icon-${gameState.winner?.toLocaleLowerCase()}.svg`}
              alt="won"
            />
            <span>TAKES THE ROUND</span>
          </>
        )}
      </div>
      <div className="end-btn">
        <button type="button" onClick={(_) => endGame()}>
          QUIT
        </button>
        <button type="button" onClick={(_) => nextRound()}>
          NEXT ROUND
        </button>
      </div>
    </section>
  );
}
