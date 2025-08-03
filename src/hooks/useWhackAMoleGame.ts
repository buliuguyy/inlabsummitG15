import { useState, useEffect, useCallback } from "react";
import type {
  GameState,
  MolePosition,
  GameStatus,
  ActionType,
} from "../types/game";
import { defaultStatuses } from "../data/gameData";

const GAME_DURATION = 60; // 游戏时长（秒）
const MOLE_DISPLAY_TIME = 3000; // 地鼠显示时间（毫秒）

export const useWhackAMoleGame = () => {
  const [gameState, setGameState] = useState<GameState>({
    score: 0,
    gameStarted: false,
    activeMoles: [],
    gameTime: GAME_DURATION,
    isGameOver: false,
  });

  const [userStatuses, setUserStatuses] =
    useState<GameStatus[]>(defaultStatuses);

  // 添加当前状态索引，用于按顺序显示图片
  const [currentStatusIndex, setCurrentStatusIndex] = useState(0);

  // 按顺序选择下一个状态
  const getNextStatus = useCallback(() => {
    const status = userStatuses[currentStatusIndex % userStatuses.length];
    setCurrentStatusIndex((prev) => prev + 1);
    return status;
  }, [currentStatusIndex, userStatuses]);

  // 随机选择一个位置生成地鼠
  const spawnMole = useCallback(() => {
    if (!gameState.gameStarted || gameState.isGameOver) return;

    const availablePositions = Array.from({ length: 9 }, (_, i) => i).filter(
      (pos) => !gameState.activeMoles.some((mole) => mole.position === pos)
    );

    if (availablePositions.length === 0) return;

    const randomPosition =
      availablePositions[Math.floor(Math.random() * availablePositions.length)];
    // 使用按顺序获取的状态，而不是随机状态
    const nextStatus = getNextStatus();

    const newMole: MolePosition = {
      id: `mole-${Date.now()}-${randomPosition}`,
      status: nextStatus,
      isVisible: true,
      position: randomPosition,
      currentState: "bad", // 地鼠总是以坏状态出现
    };

    setGameState((prev) => ({
      ...prev,
      activeMoles: [...prev.activeMoles, newMole],
    }));

    // 设置地鼠消失的定时器
    const timeoutId = setTimeout(() => {
      setGameState((prev) => ({
        ...prev,
        activeMoles: prev.activeMoles.filter((mole) => mole.id !== newMole.id),
      }));
    }, MOLE_DISPLAY_TIME);

    // 更新mole的timeoutId
    setGameState((prev) => ({
      ...prev,
      activeMoles: prev.activeMoles.map((mole) =>
        mole.id === newMole.id ? { ...mole, timeoutId } : mole
      ),
    }));
  }, [
    gameState.gameStarted,
    gameState.isGameOver,
    gameState.activeMoles,
    getNextStatus,
  ]);

  // 处理点击地鼠
  const handleMoleClick = useCallback(
    (moleId: string, actionType: ActionType) => {
      const clickedMole = gameState.activeMoles.find(
        (mole) => mole.id === moleId
      );
      if (!clickedMole) return;

      // 清除定时器
      if (clickedMole.timeoutId) {
        clearTimeout(clickedMole.timeoutId);
      }

      let points = 0;
      let shouldRemove = false;
      let shouldTransform = false;

      if (actionType === "dark-cuisine") {
        // 喂黑暗料理：将坏状态转换为好状态
        if (clickedMole.currentState === "bad") {
          points = 10;
          shouldTransform = true;
        } else {
          // 如果已经是好状态，则直接移除并得分
          points = 15;
          shouldRemove = true;
        }
      } else if (actionType === "love") {
        // 发送爱心：直接消除地鼠
        points = 5;
        shouldRemove = true;
      }

      if (shouldRemove) {
        // 移除被点击的地鼠并更新分数
        setGameState((prev) => ({
          ...prev,
          activeMoles: prev.activeMoles.filter((mole) => mole.id !== moleId),
          score: prev.score + points,
        }));
      } else if (shouldTransform) {
        // 转换状态并更新分数
        setGameState((prev) => ({
          ...prev,
          activeMoles: prev.activeMoles.map((mole) =>
            mole.id === moleId ? { ...mole, currentState: "good" } : mole
          ),
          score: prev.score + points,
        }));

        // 好状态地鼠在2秒后自动消失
        const newTimeoutId = setTimeout(() => {
          setGameState((prev) => ({
            ...prev,
            activeMoles: prev.activeMoles.filter((mole) => mole.id !== moleId),
          }));
        }, 2000);

        // 更新timeoutId
        setGameState((prev) => ({
          ...prev,
          activeMoles: prev.activeMoles.map((mole) =>
            mole.id === moleId ? { ...mole, timeoutId: newTimeoutId } : mole
          ),
        }));
      }
    },
    [gameState.activeMoles]
  );

  // 开始游戏
  const startGame = useCallback(() => {
    // 重置状态索引
    setCurrentStatusIndex(0);
    setGameState((prev) => ({
      ...prev,
      gameStarted: true,
      isGameOver: false,
      score: 0,
      gameTime: GAME_DURATION,
      activeMoles: [],
    }));
  }, []);

  // 结束游戏
  const endGame = useCallback(() => {
    // 清除所有定时器
    gameState.activeMoles.forEach((mole) => {
      if (mole.timeoutId) {
        clearTimeout(mole.timeoutId);
      }
    });

    setGameState((prev) => ({
      ...prev,
      gameStarted: false,
      isGameOver: true,
      activeMoles: [],
    }));
  }, [gameState.activeMoles]);

  // 上传自定义状态
  const uploadCustomStatuses = useCallback((statuses: GameStatus[]) => {
    setUserStatuses(statuses);
  }, []);

  // 游戏计时器
  useEffect(() => {
    let timer: number;

    if (
      gameState.gameStarted &&
      !gameState.isGameOver &&
      gameState.gameTime > 0
    ) {
      timer = setTimeout(() => {
        setGameState((prev) => ({
          ...prev,
          gameTime: prev.gameTime - 1,
        }));
      }, 1000);
    } else if (gameState.gameTime === 0) {
      endGame();
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [
    gameState.gameStarted,
    gameState.isGameOver,
    gameState.gameTime,
    endGame,
  ]);

  // 地鼠生成器
  useEffect(() => {
    let spawnTimer: number;

    if (gameState.gameStarted && !gameState.isGameOver) {
      spawnTimer = setInterval(() => {
        // 每1秒尝试生成最多2个地鼠
        const activeMoleCount = gameState.activeMoles.length;
        const molesToSpawn = Math.min(2, 2 - activeMoleCount);

        for (let i = 0; i < molesToSpawn; i++) {
          setTimeout(() => spawnMole(), i * 100); // 稍微错开生成时间
        }
      }, 1000);
    }

    return () => {
      if (spawnTimer) clearInterval(spawnTimer);
    };
  }, [
    gameState.gameStarted,
    gameState.isGameOver,
    gameState.activeMoles.length,
    spawnMole,
  ]);

  return {
    gameState,
    userStatuses,
    startGame,
    endGame,
    handleMoleClick,
    uploadCustomStatuses,
  };
};
