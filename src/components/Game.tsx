import { useEffect, useState } from "react";
import {
  type gameStateType,
  type squaresType,
  type playType,
  type players,
  type results,
} from "../types/types";
import isNulled from "../utils/isNulled";
import getGameState from "../utils/getGameState";
import getDefensiveMove from "../utils/getDefensiveMove";
import getIntermediateMove from "../utils/getIntermidateMove";
import getAdvanceMove from "../utils/minimax";
import getRandomMove from "../utils/getRandomMove";

export default function Game({
  gameState,
  setGameState,
  squares,
  setSquares,
  pX,
  pO,
  results,
  setResults,
  play,
}: {
  gameState: gameStateType;
  setGameState: React.Dispatch<React.SetStateAction<gameStateType>>;
  squares: squaresType;
  setSquares: React.Dispatch<React.SetStateAction<squaresType>>;
  play: playType;
  setPlay: React.Dispatch<React.SetStateAction<playType>>;
  pX: players;
  pO: players;
  results: results;
  setResults: React.Dispatch<React.SetStateAction<results>>;
}) {
  const baseUrl = import.meta.env.BASE_URL;
  const [turn, setTurn] = useState<string>("x");
  useEffect(() => {
    // Determine if it's currently the CPU's turn
    const isCpuTurn =
      play.against === "CPU" && turn === (play.player === "X" ? "o" : "x");

    if (isCpuTurn && gameState.status === "ongoing") {
      const timer = setTimeout(() => {
        // 1. Identify pieces
        const cpuPiece = turn; // 'x' or 'o'
        const humanPiece = turn === "x" ? "o" : "x";

        // 2. Call the advanced algorithm
        let move = null;
        switch (play.difficulty) {
          case "EASY":
            move = getRandomMove([...squares]);
            console.log("easy move");

            break;
          case "MEDIUM":
            move = getDefensiveMove([...squares], cpuPiece, humanPiece);
            console.log("medium move");
            break;
          case "HARD":
            move = getAdvanceMove([...squares], cpuPiece, humanPiece);
            console.log("hard move");

            break;
          default:
        }

        // 3. Apply the move if one was found
        if (move !== null) {
          const newSquares = [...squares];
          newSquares[move] = cpuPiece.toUpperCase() as "X" | "O";
          setSquares(newSquares);
        }
      }, 600); // Shorter delay for "fast" AI feel

      return () => clearTimeout(timer);
    }
  }, [turn, gameState.status, play, squares, setSquares]);
  function handleClick(index: number) {
    // 1. Guard clause: Stop if square is filled or game is over
    if (squares[index] || gameState.status !== "ongoing") return;
    // No allow when cpu turn
    if (play.against === "CPU" && turn !== play.player.toLowerCase()) return;
    // 2. Update the board

    const newSquares = [...squares];
    newSquares[index] = turn.toUpperCase() as "X" | "O";
    setSquares(newSquares);
  }

  const handleRestart = () => {
    setSquares(Array(9).fill(null));
    setTurn("x");
    setGameState({ status: "ongoing", winner: "draw" }); // Reset status
  };

  function calculateResults(state: gameStateType) {
    switch (state.winner) {
      case "X":
        setResults((prev) => ({ ...prev, X: prev.X + 1 }));
        break;
      case "O":
        setResults((prev) => ({ ...prev, O: prev.O + 1 }));
        break;
      case "draw":
        if (state.status === "draw") {
          setResults((prev) => ({ ...prev, draw: prev.draw + 1 }));
          break;
        }
        break;

      default:
        break;
    }
  }
  // Handle Game State Logic whenever squares change
  useEffect(() => {
    const nulled = isNulled(squares);
    if (!nulled) {
      const state = getGameState(squares);
      setGameState(state);
      console.log(state);
      if (state.status === "ongoing") {
        setTurn(turn === "x" ? "o" : "x");
      }
      calculateResults(state);
    }
  }, [squares, setGameState]);
  return (
    <section className="game">
      <div className="head">
        <img src={`${baseUrl}/assets/logo.svg`} alt="logo" />
        <div className="turn">
          <img src={`${baseUrl}/assets/icon-${turn}.svg`} alt="turn" />
          <span>TURN</span>
        </div>
        <button
          type="button"
          className="restart"
          onClick={(_) => {
            handleRestart();
          }}
        >
          <img src={`${baseUrl}/assets/icon-restart.svg`} alt="restart" />
        </button>
      </div>
      <div className="board">
        {squares.map((square, index) => (
          <div
            className={`cell c-${index + 1}`}
            key={index}
            onClick={(_) => handleClick(index)}
          >
            <img
              src={
                square === "X"
                  ? `${baseUrl}/assets/icon-x.svg`
                  : square === "O"
                    ? `${baseUrl}/assets/icon-o.svg`
                    : undefined
              }
            />
            {square === "X" || square === "O" ? (
              ""
            ) : (
              <img
                className={`icon-hover`}
                src={`${baseUrl}/assets/icon-${turn}-outline.svg`}
                alt=""
              />
            )}
          </div>
        ))}
      </div>
      <div className="results">
        <div className="player">
          <span>{`X(${pX})`}</span>
          <span className="total">{results.X}</span>
        </div>
        <div className="player">
          <span>TIES</span>
          <span className="total">{results.draw}</span>
        </div>
        <div className="player">
          <span>{`O(${pO})`}</span>
          <span className="total">{results.O}</span>
        </div>
      </div>

      <div className="foot"></div>
    </section>
  );
}
