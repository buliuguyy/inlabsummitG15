import type { GameState } from "../types/game";
import "./GamePanel.css";

interface GamePanelProps {
  gameState: GameState;
  onStartGame: () => void;
}

const GamePanel = ({ gameState, onStartGame }: GamePanelProps) => {
  return (
    <div className="game-panel">
      <div className="game-info">
        <h1>打地鼠变体游戏</h1>
        <div className="stats">
          <div className="stat-item">
            <span className="stat-label">分数:</span>
            <span className="stat-value">{gameState.score}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">时间:</span>
            <span className="stat-value">{gameState.gameTime}s</span>
          </div>
        </div>
      </div>

      {!gameState.gameStarted && !gameState.isGameOver && (
        <div className="game-setup">
          <button onClick={onStartGame} className="start-button">
            开始游戏
          </button>
        </div>
      )}

      {gameState.isGameOver && (
        <div className="game-over">
          <h2>游戏结束!</h2>
          <p className="final-score">最终分数: {gameState.score}</p>
          <button onClick={onStartGame} className="restart-button">
            再来一局
          </button>
        </div>
      )}

      {gameState.gameStarted && (
        <div className="game-instructions">
          <div className="instruction-item">
            <span>💖 左键点击: 发送爱心消除 (+5分)</span>
          </div>
          <div className="instruction-item">
            <span>🍄 右键点击: 喂黑暗料理转好 (+10分/15分)</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default GamePanel;
