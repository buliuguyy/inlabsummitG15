import type { GameState } from '../types/game';
import './GamePanel.css';

interface GamePanelProps {
  gameState: GameState;
  onStartGame: () => void;
}

const GamePanel = ({ 
  gameState, 
  onStartGame
}: GamePanelProps) => {

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
          <div className="avatar-section">
            <h3>上传你的头像</h3>
            <div className="avatar-preview">
              {gameState.userAvatar ? (
                <img
                  src={gameState.userAvatar}
                  alt="用户头像"
                  className="avatar-image"
                />
              ) : (
                <div className="avatar-placeholder">👤</div>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarUpload}
              className="avatar-input"
              id="avatar-upload"
            />
            <label htmlFor="avatar-upload" className="avatar-button">
              选择头像
            </label>
          </div>

          <div className="custom-status-section">
            <button
              onClick={() => setShowStatusUploader(true)}
              className="custom-status-button"
            >
              自定义状态
            </button>
          </div>

          <button
            onClick={onStartGame}
            className="start-button"
            disabled={!gameState.userAvatar}
          >
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
            <span>🍄 左键点击: 喂黑暗料理 (+10分)</span>
          </div>
          <div className="instruction-item">
            <span>💖 右键点击: 发送爱心 (+15分)</span>
          </div>
        </div>
      )}

      {showStatusUploader && (
        <StatusUploader
          onStatusesUploaded={onCustomStatuses}
          onClose={() => setShowStatusUploader(false)}
        />
      )}
    </div>
  );
};

export default GamePanel;
