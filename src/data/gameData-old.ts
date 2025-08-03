import type { GameStatus } from "../types/game";

// 动态生成状态列表，基于assets文件夹中的图片
export const generateStatusesFromAssets = (): GameStatus[] => {
  const statuses: GameStatus[] = [];
  
  // 假设有1-10的图片，实际项目中可以通过API获取文件列表
  for (let i = 1; i <= 10; i++) {
    statuses.push({
      id: i.toString(),
      badText: `状态${i} - 坏`,
      goodText: `状态${i} - 好`,
      badImage: `/assets/bad${i}.svg`,
      goodImage: `/assets/good${i}.svg`,
    });
  }
  
  return statuses;
};

export const defaultStatuses: GameStatus[] = generateStatusesFromAssets();
    goodText: "拿到offer",
    badImage: "/assets/bad3.svg",
    goodImage: "/assets/good3.svg",
  },
  {
    id: "4",
    badText: "项目被砍",
    goodText: "项目成功",
    badImage: "/assets/bad4.svg",
    goodImage: "/assets/good4.svg",
  },
  {
    id: "5",
    badText: "加班到深夜",
    goodText: "准时下班",
    badImage: "/assets/bad5.svg",
    goodImage: "/assets/good5.svg",
  },
  {
    id: "6",
    badText: "电脑死机",
    goodText: "系统稳定",
    badImage: "/assets/bad6.svg",
    goodImage: "/assets/good6.svg",
  },
  {
    id: "7",
    badText: "代码被拒",
    goodText: "代码通过",
    badImage: "/assets/bad7.svg",
    goodImage: "/assets/good7.svg",
  },
  {
    id: "8",
    badText: "服务器宕机",
    goodText: "服务稳定",
    badImage: "/assets/bad8.svg",
    goodImage: "/assets/good8.svg",
  },
  {
    id: "9",
    badText: "Bug满天飞",
    goodText: "零Bug上线",
    badImage: "/assets/bad9.svg",
    goodImage: "/assets/good9.svg",
  },
  {
    id: "10",
    badText: "需求频繁变更",
    goodText: "需求稳定",
    badImage: "/assets/bad10.svg",
    goodImage: "/assets/good10.svg",
  },
];

// 黑暗料理和爱心的图标
export const gameAssets = {
  darkCuisine: "🍄", // 黑暗料理图标
  love: "💖", // 爱心图标
  moleHole: "🕳️", // 地洞图标
};
