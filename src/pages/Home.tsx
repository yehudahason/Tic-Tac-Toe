import Menu from "../components/Menu";
import Game from "../components/Game";
import Footer from "../components/Footer";
import { useState } from "react";
import type { gameStateType, playType, squaresType } from "../types/types";

const Home = () => {
  const [gameState, setGameState] = useState<gameStateType>({
    status: "notStarted",
  });
  const [play, setPlay] = useState<playType>({ player: "x", against: "cpu" });
  const [squares, setSquares] = useState<squaresType>(Array(9).fill(null));
  return (
    <>
      <Menu play={play} setPlay={setPlay} setGameState={setGameState} />
      <Game
        gameState={gameState}
        setGameState={setGameState}
        squares={squares}
        setSquares={setSquares}
        play={play}
        setPlay={setPlay}
      />
      <Footer />
    </>
  );
};

export default Home;
