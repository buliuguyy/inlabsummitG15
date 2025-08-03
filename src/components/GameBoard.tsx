import MoleHole from "./MoleHole";
import type { MolePosition, ActionType } from "../types/game";
import "./GameBoard.css";

interface GameBoardProps {
  activeMoles: MolePosition[];
  onMoleClick: (moleId: string, actionType: ActionType) => void;
  gameStarted: boolean;
}

const GameBoard = ({
  activeMoles,
  onMoleClick,
  gameStarted,
}: GameBoardProps) => {
  // 创建9个洞位
  const holes = Array.from({ length: 9 }, (_, index) => {
    const mole = activeMoles.find((m) => m.position === index);
    return (
      <MoleHole
        key={index}
        position={index}
        mole={mole}
        onMoleClick={onMoleClick}
      />
    );
  });

  return (
    <div className={`game-board ${gameStarted ? "game-active" : ""}`}>
      {holes}
    </div>
  );
};

export default GameBoard;
