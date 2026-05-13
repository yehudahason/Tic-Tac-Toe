import Menu from "../components/Menu";
import Game from "../components/Game";
import Footer from "../components/Footer";
import { useState } from "react";
import type {
  gameStateType,
  playType,
  squaresType,
  players,
} from "../types/types";

const Home = () => {
  const [gameState, setGameState] = useState<gameStateType>({
    status: "notStarted",
  });
  const [play, setPlay] = useState<playType>({ player: "X", against: "CPU" });
  const [squares, setSquares] = useState<squaresType>(Array(9).fill(null));
  const [p1, setP1] = useState<players>("YOU");
  const [p2, setP2] = useState<players>("CPU");
  return (
    <>
      <Menu
        play={play}
        setPlay={setPlay}
        setGameState={setGameState}
        setP1={setP1}
        setP2={setP2}
      />
      <Game
        gameState={gameState}
        setGameState={setGameState}
        squares={squares}
        setSquares={setSquares}
        play={play}
        setPlay={setPlay}
        p1={p1}
        p2={p2}
      />
      <Footer />
    </>
  );
};

export default Home;
