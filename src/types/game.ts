export interface GameStatus {
  id: string;
  badText: string;
  goodText: string;
  badImage: string;
  goodImage: string;
}

export interface MolePosition {
  id: string;
  status: GameStatus;
  isVisible: boolean;
  position: number; // 0-8 for 9 holes
  timeoutId?: number;
  currentState: "bad" | "good"; // 当前状态是好还是坏
}

export interface GameState {
  score: number;
  gameStarted: boolean;
  activeMoles: MolePosition[];
  gameTime: number;
  isGameOver: boolean;
}

export type ActionType = "dark-cuisine" | "love";
