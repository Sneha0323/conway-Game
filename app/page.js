import Game from "./components/Game";


export default function Home() {
  return (
    <main>
      <div className="container">
        <h1>Conway's Game of Life</h1>
        <div className="Gamespace">
        <Game />
        </div>
        
      </div>

    </main>
  );
}