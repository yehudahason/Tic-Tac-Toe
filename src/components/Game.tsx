import { useEffect, useState } from "react";
import {
  type gameStateType,
  type squaresType,
  type playType,
  type players,
} from "../types/types";
import isNulled from "../utils/isNulled";
import getGameState from "../utils/getGameState";

export default function Game({
  gameState,
  setGameState,
  squares,
  setSquares,
  play,
  setPlay,
  p1,
  p2,
}: {
  gameState: gameStateType;
  setGameState: React.Dispatch<React.SetStateAction<gameStateType>>;
  squares: squaresType;
  setSquares: React.Dispatch<React.SetStateAction<squaresType>>;
  play: playType;
  setPlay: React.Dispatch<React.SetStateAction<playType>>;
  p1: players;
  p2: players;
}) {
  const [turn, setTurn] = useState<string>("x");
  function handleClick(index: number) {
    // 1. Guard clause: Stop if square is filled or game is over
    if (squares[index] || gameState.status !== "ongoing") return;

    // 2. Update the board
    const newSquares = [...squares];
    newSquares[index] = turn;
    setSquares(newSquares);
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
    }
  }, [squares, setGameState]);

  const handleRestart = () => {
    setSquares(Array(9).fill(null));
    setTurn("x");
    setGameState({ status: "ongoing", winner: undefined }); // Reset status
  };
  const baseUrl = import.meta.env.BASE_URL;
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
                square === "x"
                  ? `${baseUrl}/assets/icon-x.svg`
                  : square === "o"
                    ? `${baseUrl}/assets/icon-o.svg`
                    : undefined
              }
            />
          </div>
        ))}
      </div>
      <div className="results">
        <div className="player">
          <span>{`X(${p1})`}</span>
          <span>0</span>
        </div>
        <div className="ties">
          <span>TIES</span>
          <span>0</span>
        </div>
        <div className="player">
          {" "}
          <span>{`Y(${p2})`}</span>
          <span>0</span>
        </div>
      </div>

      <div className="foot"></div>
    </section>
  );
}
