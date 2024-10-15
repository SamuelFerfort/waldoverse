import Leaderboard from "../leaderboard/page";

export type TargetingCircleProps = {
  x: number;
  y: number;
  isVisible: boolean;
};

export type Character = {
  id: string;
  isFound?: boolean;
  name: string;
  picture: string;
};

export type CharactersProps = {
  characters: Character[];
  gameStartTime: number;
  elapsedTime: number;
};

export type GameDataProps = {
  data: {
    id: string;
    url: string;
    title: string;
    characters: Character[];
  };
  token: string;
};

export type Image = {
  url: string;
  title: string;
  id: string;
};

export type Coordinates = {
  x: number;
  y: number;
};

export type CharFoundMarker = {
  x: number;
  y: number;
  name: string;
};

type leaderboard = {
  id: string;
  name: string;
  imageId: string;
  duration: number;
  timestamp: Date;
};

export type LeaderboardProps = {
  leaderboard: leaderboard[];
  images: Image[];
};
export type LeaderboardTableProps = {
  filteredLeaderboard: leaderboard[];
  title: string | undefined;
};
