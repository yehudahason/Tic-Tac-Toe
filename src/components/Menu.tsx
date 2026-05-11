import type { gameStateType, playType } from "../types/types";

export default function Menu({
  play,
  setPlay,
  setGameState,
}: {
  play: playType;
  setPlay: React.Dispatch<React.SetStateAction<playType>>;
  setGameState: React.Dispatch<React.SetStateAction<gameStateType>>;
}) {
  const baseUrl = import.meta.env.BASE_URL;
  return (
    <section className="menu">
      <img src={`${baseUrl}/assets/logo.svg`} alt="Logo" />
      <div className="mark">
        <h3>PICK PLAYER 1'S MARK</h3>
        <div className="mark-icons">
          <button className={`x bg ${play.player === "x" && "active"} `} onClick={(_)=>setPlay({ ...play, player: "x" })}>
            <img src={`${baseUrl}/assets/icon-x.svg`} alt="X" />
          </button>
          <button className={`o bg ${play.player === "o" && "active"}`}
          onClick={(_)=>setPlay({ ...play, player: "o" })}>
            <img src={`${baseUrl}/assets/icon-o.svg`} alt="O" />
          </button>
        </div>
        <h4>REMEMBER: X GOES FIRST</h4>
      </div>
      <button
        className="menu-btn cpu"
        onClick={() => setGameState({ status: "ongoing" })}
      >
        NEW GAME (VS CPU)
      </button>
      <button
        className="menu-btn player"
        onClick={() => setGameState({ status: "ongoing" })}
      >
        NEW GAME (VS PLAYER)
      </button>
    </section>
  );
}
