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

  const handleStartGame = (against: "CPU" | "P2") => {
    // 1. Calculate labels based on current mark selection
    if (against === "CPU") {
      setPX(play.player === "X" ? "YOU" : "CPU");
      setPO(play.player === "O" ? "YOU" : "CPU");
    } else {
      setPX(play.player === "X" ? "P1" : "P2");
      setPO(play.player === "O" ? "P1" : "P2");
    }

    // 2. Set the play mode and start the game
    setPlay({ ...play, against });
    setGameState({ status: "ongoing", winner: "draw" });
  };

  return (
    <section className="menu">
      <img src={`${baseUrl}/assets/logo.svg`} alt="Logo" />
      <div className="mark">
        <h3>PICK PLAYER 1'S MARK</h3>
        <div className="mark-icons">
          <button
            type="button"
            className={`x bg ${play.player === "X" && "active"} `}
            onClick={(_) => setPlay({ ...play, player: "X" })}
          >
            <img src={`${baseUrl}/assets/icon-x.svg`} alt="X" />
          </button>
          <button
            type="button"
            className={`o bg ${play.player === "O" && "active"}`}
            onClick={(_) => setPlay({ ...play, player: "O" })}
          >
            <img src={`${baseUrl}/assets/icon-o.svg`} alt="O" />
          </button>
        </div>
        <h4>REMEMBER: X GOES FIRST</h4>
      </div>

      <button
        type="button"
        className="menu-btn cpu"
        onClick={() => {
          handleStartGame("CPU");
        }}
      >
        NEW GAME (VS CPU)
      </button>
      <button
        type="button"
        className="menu-btn player"
        onClick={() => {
          handleStartGame("P2");
        }}
      >
        NEW GAME (VS PLAYER)
      </button>
      <div className="difficulty-select">
        <h3>DIFFICULTY</h3>
        <div className="diff-options">
          <button
            type="button"
            className={`diff-btn ${play.difficulty === "EASY" ? "active" : ""}`}
            onClick={() => setPlay({ ...play, difficulty: "EASY" })}
          >
            EASY
          </button>
          <button
            type="button"
            className={`diff-btn ${play.difficulty === "MEDIUM" ? "active" : ""}`}
            onClick={() => setPlay({ ...play, difficulty: "MEDIUM" })}
          >
            INTERMEDIATE
          </button>
          <button
            type="button"
            className={`diff-btn ${play.difficulty === "HARD" ? "active" : ""}`}
            onClick={() => setPlay({ ...play, difficulty: "HARD" })}
          >
            HARD
          </button>
        </div>
      </div>
    </section>
  );
}
