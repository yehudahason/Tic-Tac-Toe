import Menu from "../components/Menu";
import Game from "../components/Game";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import {
  type gameStateType,
  type playType,
  type squaresType,
  type players,
  type results,
} from "../types/types";
import EndGameBanner from "../components/EndGameBanner";
import RestartBanner from "../components/RestartBanner";

const Home = () => {
  const [gameState, setGameState] = useState<gameStateType>({
    status: "notStarted",
    winner: "draw",
    line: null,
  });
  const [play, setPlay] = useState<playType>({
    player: "X",
    against: "CPU",
    difficulty: "MEDIUM",
  });
  const [squares, setSquares] = useState<squaresType>(Array(9).fill(null));
  const [pX, setPX] = useState<players>("YOU");
  const [pO, setPO] = useState<players>("CPU");
  const [results, setResults] = useState<results>(() => {
    const saved = localStorage.getItem("tic-tac-toe-results");
    return saved ? JSON.parse(saved) : { X: 0, O: 0, draw: 0 };
  });
  const [turn, setTurn] = useState<string>("x");
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    if (gameState.status === "winner" || gameState.status === "draw") {
      const timer = setTimeout(() => {
        setShowBanner(true);
      }, 1200);

      // Clean up timer if the component unmounts or status changes
      return () => clearTimeout(timer);
    } else {
      setShowBanner(false);
    }
  }, [gameState.status]);

  useEffect(() => {
    const saved = localStorage.getItem("tic-tac-toe-results");
    if (saved) setGameState({ status: "ongoing", winner: "draw", line: null });
  }, []);
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
          turn={turn}
          setTurn={setTurn}
        />
      )}
      {showBanner && (
        <EndGameBanner
          gameState={gameState}
          setGameState={setGameState}
          play={play}
          setTurn={setTurn}
          setSquares={setSquares}
        />
      )}
      {gameState.status === "stopped" && (
        <RestartBanner
          gameState={gameState}
          setGameState={setGameState}
          play={play}
          setTurn={setTurn}
          setSquares={setSquares}
        />
      )}
      <Footer />
    </>
  );
};

export default Home;
