export const BASE_URL = `https://api.spotify.com/v1`;

export const apiEndpoints = {
  getUserTopArtists: () => {
    return `${BASE_URL}/me/top/artists`;
  },
  getTracks: () => {
    return `${BASE_URL}/me/top/tracks`;
  },
};
