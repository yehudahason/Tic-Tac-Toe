import { useEffect, useRef } from "react";
import { type gameStateType, type squaresType } from "../types/types";

export default function RestartBanner({
  setGameState,
  setTurn,
  setSquares,
}: {
  setGameState: React.Dispatch<React.SetStateAction<gameStateType>>;
  setTurn: React.Dispatch<React.SetStateAction<string>>;
  setSquares: React.Dispatch<React.SetStateAction<squaresType>>;
}) {
  const inputRef = useRef<HTMLButtonElement>(null);
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
    document.body.classList.add("end");
    inputRef.current?.focus();
    return () => {
      document.body.classList.remove("end");
    };
  }, []);
  return (
    <section
      className="end-game-banner"
      role="dialog"
      aria-modal="true"
      aria-labelledby="restart-title"
    >
      <p className="restart-msg" id="restart-title">
        RESTART GAME?
      </p>
      <div className="end-btn">
        <button type="button" onClick={(_) => nextRound()}>
          NO CANCEL
        </button>
        <button ref={inputRef} type="button" onClick={(_) => endGame()}>
          YES RESTART
        </button>
      </div>
    </section>
  );
}
