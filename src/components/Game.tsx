import type { gameStateType } from "../types/types";

export default function Game({
  gameState,
  setGameState,
}: {
  gameState: gameStateType;
  setGameState: React.Dispatch<React.SetStateAction<gameStateType>>;
}) {
  const baseUrl = import.meta.env.BASE_URL;
  return (
    <section className="game">
      <div className="head">
        <img src={`${baseUrl}/assets/logo.svg`} alt="logo" />
        <div className="turn">
          <img src={`${baseUrl}/assets/icon-x.svg`} alt="turn" />
          <span>TURN</span>
        </div>
        <div className="restart">
          <img src={`${baseUrl}/assets/icon-restart.svg`} alt="restart" />
        </div>
      </div>
      <div className="board">
        <div className="cell"></div>
        <div className="cell"></div>
        <div className="cell"></div>
        <div className="cell"></div>
        <div className="cell"></div>
        <div className="cell"></div>
        <div className="cell"></div>
        <div className="cell"></div>
        <div className="cell"></div>
      </div>
      <div className="foot"></div>
    </section>
  );
}
