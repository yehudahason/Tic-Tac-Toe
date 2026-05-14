import { useEffect, useState, useRef } from "react";
import {
  type gameStateType,
  type playType,
  type squaresType,
} from "../types/types";
import { FocusTrap } from "focus-trap-react";

export default function EndGameBanner({
  gameState,
  setGameState,
  play,
  setTurn,
  setSquares,
  resetAll,
}: {
  gameState: gameStateType;
  setGameState: React.Dispatch<React.SetStateAction<gameStateType>>;
  play: playType;
  setTurn: React.Dispatch<React.SetStateAction<string>>;
  setSquares: React.Dispatch<React.SetStateAction<squaresType>>;
  resetAll: () => void;
}) {
  const inputRef = useRef<HTMLButtonElement>(null);
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

    resetAll();
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
    // Grab your main app container
    const mainContent = document.querySelector(".game");

    document.body.classList.add("end");
    inputRef.current?.focus();

    // Make the background non-interactive
    mainContent?.setAttribute("aria-hidden", "true");
    mainContent?.setAttribute("inert", "");

    return () => {
      document.body.classList.remove("end");
      mainContent?.removeAttribute("aria-hidden");
      mainContent?.removeAttribute("inert");
    };
  }, []);
  return (
    <FocusTrap>
      <section
        className="end-game-banner"
        role="dialog"
        aria-modal="true"
        aria-labelledby="game-result-title"
      >
        <p
          className="winner"
          id="game-result-title"
          role="status"
          aria-live="polite"
        >
          {winner}
        </p>
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
          <button ref={inputRef} type="button" onClick={(_) => nextRound()}>
            NEXT ROUND
          </button>
        </div>
      </section>
    </FocusTrap>
  );
}
