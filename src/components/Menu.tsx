import type { gameStateType } from "../types/types";



export default function Menu({ gameState, setGameState }: { gameState: 
  gameStateType, setGameState: React.Dispatch<React.SetStateAction<{ status: string }>>   }) {
    const baseUrl = import.meta.env.BASE_URL;
  return (
    <section className="menu">
      <img src={`${baseUrl}/assets/logo.svg`} alt="Logo" />
      <div className="mark">
        <h3>PICK PLAYER 1'S MARK</h3>
        <div className="mark-icons">
          <div className="x bg active">
            <img src={`${baseUrl}/assets/icon-x.svg`} alt="X" />
          </div>
           <div className="o bg ">
            <img src={`${baseUrl}/assets/icon-o.svg`} alt="O" />
          </div>
        </div>
        <h4>REMEMBER: X GOES FIRST</h4>
      </div>
      <button className="menu-btn cpu" onClick={() => setGameState({ status: 'playing' })}>NEW GAME (VS CPU)</button>
      <button className="menu-btn player" onClick={() => setGameState({ status: 'playing' })}>NEW GAME (VS PLAYER)</button>
    </section>
    
  )
}
