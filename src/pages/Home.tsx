import Menu from "../components/Menu";
import Game from "../components/Game";
import Footer from "../components/Footer";
import { useState } from "react";
import type { gameStateType, playType } from "../types/types";

const Home = () => {
  const [gameState, setGameState] = useState<gameStateType>({ status: "notStarted" });
  const [play, setPlay] = useState<playType>({ player: "x", against: "cpu" });
  return (
    <>
      <Menu play={play} setPlay={setPlay} setGameState={setGameState} />
      <Game gameState={gameState} setGameState={setGameState} />
      <Footer />
    </>
  );
};

export default Home;
