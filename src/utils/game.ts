import { Game, GameFull } from "../types/interface";

// we are going to be doing filtering by whatever we get back from the database instead of whatever the API call expects because we are filtering locally
export function filterGames(
  games: Game[] | GameFull[],
  property: keyof Game,
  value: string
): Game[] | GameFull[] {
  return games.filter((game) => {
    const propValue = game[property];
    if (typeof propValue === "string") {
      return propValue.toLowerCase().includes(value.toLowerCase());
    }
    return false;
  });
}

export function getRandomGame(games: Game[] | GameFull[]): Game | GameFull {
  const randomIndex = Math.floor(Math.random() * games.length);
  return games[randomIndex];
}
