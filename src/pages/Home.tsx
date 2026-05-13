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
  const [pX, setPX] = useState<players>("YOU");
  const [pY, setPY] = useState<players>("CPU");
  return (
    <>
      <Menu
        play={play}
        setPlay={setPlay}
        setGameState={setGameState}
        setPX={setPX}
        setPY={setPY}
      />
      <Game
        gameState={gameState}
        setGameState={setGameState}
        squares={squares}
        setSquares={setSquares}
        play={play}
        setPlay={setPlay}
        pX={pX}
        pY={pY}
      />
      <Footer />
    </>
  );
};

export default Home;
