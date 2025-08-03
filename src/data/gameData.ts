import type { GameStatus } from "../types/game";

// 动态生成状态列表，基于assets文件夹中的图片
export const generateStatusesFromAssets = (): GameStatus[] => {
  const statuses: GameStatus[] = [];

  // 使用bad0-bad4和good0-good4的PNG图片
  for (let i = 0; i <= 4; i++) {
    statuses.push({
      id: i.toString(),
      badText: `状态${i} - 坏`,
      goodText: `状态${i} - 好`,
      badImage: `/assets/bad${i}.png`,
      goodImage: `/assets/good${i}.png`,
    });
  }

  return statuses;
};

export const defaultStatuses: GameStatus[] = generateStatusesFromAssets();

// 黑暗料理和爱心的图标
export const gameAssets = {
  darkCuisine: "🍄", // 黑暗料理图标
  love: "💖", // 爱心图标
  moleHole: "🕳️", // 地洞图标
};
