import  const {
    gameState,
    startGame,
    handleMoleClick,
    uploadCustomStatuses
  } = useWhackAMoleGame();nel from "./components/GamePanel";
import GameBoard from "./components/GameBoard";
import { useWhackAMoleGame } from "./hooks/useWhackAMoleGame";
import "./App.css";

function App() {
  const {
    gameState,
    startGame,
    handleMoleClick,
    setUserAvatar,
    uploadCustomStatuses,
  } = useWhackAMoleGame();

  return (
    <div className="App">
      <div className="game-container">
        <GamePanel
          gameState={gameState}
          onStartGame={startGame}
          onAvatarUpload={setUserAvatar}
          onCustomStatuses={uploadCustomStatuses}
        />
        <GameBoard
          activeMoles={gameState.activeMoles}
          onMoleClick={handleMoleClick}
          gameStarted={gameState.gameStarted}
        />
      </div>
    </div>
  );
}

export default App;
