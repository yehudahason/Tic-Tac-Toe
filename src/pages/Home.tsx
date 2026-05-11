import Menu from "../components/Menu";
import Game from "../components/Game";
import Footer from "../components/Footer";
import { useState } from "react";
import type { gameStateType } from "../types/types";

const Home = () => {
  const [gameState, setGameState] = useState<gameStateType>({ status: 'stop' });
  return (
    <>
      <Menu gameState={gameState} setGameState={setGameState}/>
      <Game gameState={gameState} setGameState={setGameState}/>
      <Footer />
    </>
  );
};

export default Home;
