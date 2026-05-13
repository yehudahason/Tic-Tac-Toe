import { useEffect } from "react";
import type { gameStateType, playType, players } from "../types/types";

export default function Menu({
  play,
  setPlay,
  setGameState,
  setPX,
  setPO,
}: {
  play: playType;
  setPlay: React.Dispatch<React.SetStateAction<playType>>;
  setGameState: React.Dispatch<React.SetStateAction<gameStateType>>;
  setPX: React.Dispatch<React.SetStateAction<players>>;
  setPO: React.Dispatch<React.SetStateAction<players>>;
}) {
  const baseUrl = import.meta.env.BASE_URL;

  function setPlayers(players: string) {
    switch (players) {
      case "X-CPU":
        setPX("YOU");
        setPO("CPU");
        break;

      case "O-CPU":
        setPX("CPU");
        setPO("YOU");
        break;

      case "X-P2":
        setPX("P1");
        setPO("P2");
        break;

      case "O-P2":
        setPX("P2");
        setPO("P1");
        break;

      default:
        break;
    }
  }
  useEffect(() => {
    setPlayers(`${play.player}-${play.against}`);
  }, [play, setPX, setPO]);

  return (
    <section className="menu">
      <img src={`${baseUrl}/assets/logo.svg`} alt="Logo" />
      <div className="mark">
        <h3>PICK PLAYER 1'S MARK</h3>
        <div className="mark-icons">
          <button
            className={`x bg ${play.player === "X" && "active"} `}
            onClick={(_) => setPlay({ ...play, player: "X" })}
          >
            <img src={`${baseUrl}/assets/icon-x.svg`} alt="X" />
          </button>
          <button
            className={`o bg ${play.player === "O" && "active"}`}
            onClick={(_) => setPlay({ ...play, player: "O" })}
          >
            <img src={`${baseUrl}/assets/icon-o.svg`} alt="O" />
          </button>
        </div>
        <h4>REMEMBER: X GOES FIRST</h4>
      </div>
      <button
        className="menu-btn cpu"
        onClick={() => {
          setGameState({ status: "ongoing", winner: "draw" });
          setPlay({ ...play, against: "CPU" });
        }}
      >
        NEW GAME (VS CPU)
      </button>
      <button
        className="menu-btn player"
        onClick={() => {
          setGameState({ status: "ongoing", winner: "draw" });
          setPlay({ ...play, against: "P2" });
        }}
      >
        NEW GAME (VS PLAYER)
      </button>
    </section>
  );
}
