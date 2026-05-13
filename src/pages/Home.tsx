import Menu from "../components/Menu";
import Game from "../components/Game";
import Footer from "../components/Footer";
import { useState } from "react";
import {
  type gameStateType,
  type playType,
  type squaresType,
  type players,
  type results,
} from "../types/types";

const Home = () => {
  const [gameState, setGameState] = useState<gameStateType>({
    status: "notStarted",
    winner: "draw",
  });
  const [play, setPlay] = useState<playType>({
    player: "X",
    against: "CPU",
    difficulty: "EASY",
  });
  const [squares, setSquares] = useState<squaresType>(Array(9).fill(null));
  const [pX, setPX] = useState<players>("YOU");
  const [pO, setPO] = useState<players>("CPU");
  const [results, setResults] = useState<results>({
    X: 0,
    O: 0,
    draw: 0,
  });
  return (
    <>
      {gameState.status === "notStarted" ? (
        <Menu
          play={play}
          setPlay={setPlay}
          setGameState={setGameState}
          setPX={setPX}
          setPO={setPO}
        />
      ) : (
        <Game
          gameState={gameState}
          setGameState={setGameState}
          squares={squares}
          setSquares={setSquares}
          play={play}
          setPlay={setPlay}
          pX={pX}
          pO={pO}
          results={results}
          setResults={setResults}
        />
      )}

      <Footer />
    </>
  );
};

export default Home;
