/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

export type ArtistHomeType = {
  id: string;
  imageUri: string;
  artistName: string;
};

export type ArtistStatsType = {
  id: string;
  imageUri: string;
  artistName: string;
  puntuation: number;
};

export type AchievementType = {
  type: string;
  id: string;
  name: string;
  desc: string;
  imageUri: string;
  unlocked: boolean;
};
