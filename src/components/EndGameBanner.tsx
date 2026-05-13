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
    setGameState({ status: "ongoing", winner: "draw" }); // Reset status
  };

  useEffect(() => {
    console.log(play);
    console.log(gameState);
    if (play.against === "CPU") {
      switch (gameState.winner) {
        case "X":
          if (play.player === "X") {
            setWinner("YOU WON!");
          } else {
            setWinner("OH NO YOU LOST...");
          }
          break;
        case "O":
          if (play.player === "O") {
            setWinner("YOU WON");
          } else {
            setWinner("OH NO YOU LOST...");
          }
          break;
        case "draw":
          setWinner("ROUND TIED");
          break;
        default:
          break;
      }
    }
    if (play.against === "P2") {
      switch (gameState.winner) {
        case "X":
          if (play.player === "X") setWinner("PLAYER 1 WINS!");
          break;
        case "O":
          if (play.player === "X") setWinner("PLAYER 2 WINS!");
          break;
        case "draw":
          setWinner("ROUND TIED");
          break;
        default:
          break;
      }
    }
  }, [play, gameState]);

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
      <p className="winner">{winner}</p>
      <div className={`takes ${gameState.winner}`}>
        {gameState.winner !== "draw" && (
          <>
            <img
              src={`${baseUrl}/assets/icon-${gameState.winner.toLocaleLowerCase()}.svg`}
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
