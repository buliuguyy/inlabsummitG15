import type { MouseEvent } from "react";
import type { MolePosition, ActionType } from "../types/game";
import { gameAssets } from "../data/gameData";
import "./MoleHole.css";

interface MoleHoleProps {
  position: number;
  mole?: MolePosition;
  onMoleClick: (moleId: string, actionType: ActionType) => void;
}

const MoleHole = ({ mole, onMoleClick }: MoleHoleProps) => {
  const handleLeftClick = (e: MouseEvent) => {
    e.preventDefault();
    if (mole) {
      // 左键点击：如果是坏状态则转换为好状态，如果是好状态则消除
      if (mole.currentState === "bad") {
        onMoleClick(mole.id, "dark-cuisine"); // 转换为好状态
      } else {
        onMoleClick(mole.id, "love"); // 消除好状态地鼠
      }
    }
  };

  const handleRightClick = (e: MouseEvent) => {
    e.preventDefault();
    if (mole) {
      onMoleClick(mole.id, "love"); // 右键直接消除
    }
  };

  return (
    <div
      className={`mole-hole ${mole?.isVisible ? "has-mole" : ""}`}
      onClick={handleLeftClick}
      onContextMenu={handleRightClick}
    >
      <div className="hole-background">{gameAssets.moleHole}</div>

      {mole?.isVisible && (
        <div className={`mole-container ${mole.currentState}`}>
          <div className="mole-image">
            <img
              src={
                mole.currentState === "bad"
                  ? mole.status.badImage
                  : mole.status.goodImage
              }
              alt={
                mole.currentState === "bad"
                  ? mole.status.badText
                  : mole.status.goodText
              }
              className="status-image"
            />
          </div>
          <div className="mole-status">
            {mole.currentState === "bad"
              ? mole.status.badText
              : mole.status.goodText}
          </div>
          <div className="action-hints">
            {mole.currentState === "bad" ? (
              <>
                <span className="left-click">左键: 转换为好状态</span>
                <span className="right-click">右键: 直接消除</span>
              </>
            ) : (
              <>
                <span className="good-state">已转为好状态！</span>
                <span className="left-click">左键: 消除</span>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MoleHole;
