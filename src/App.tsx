import GamePanel from "./components/GamePanel";
import GameBoard from "./components/GameBoard";
import { useWhackAMoleGame } from "./hooks/useWhackAMoleGame";
import "./App.css";

function App() {
  const { gameState, startGame, handleMoleClick } = useWhackAMoleGame();

  return (
    <div className="App">
      <header className="App-header">
        <h1>打地鼠</h1>
      </header>
      <main>
        <div className="game-container">
          <GamePanel gameState={gameState} onStartGame={startGame} />
          <GameBoard
            activeMoles={gameState.activeMoles}
            onMoleClick={handleMoleClick}
            gameStarted={gameState.gameStarted}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
