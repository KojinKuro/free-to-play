import { Game } from "../types/interface";

// we are going to be doing filtering by whatever we get back from the database instead of whatever the API call expects because we are filtering locally
export function filterGames(
  games: Game[],
  key: keyof Game,
  value: string
): Game[] {
  return games.filter((game) => {
    const propValue = game[key];
    if (typeof propValue !== "string") return false;
    return propValue.toLowerCase().includes(value.toLowerCase());
  });
}

export function getRandomGame(games: Game[]): Game {
  const randomIndex = Math.floor(Math.random() * games.length);
  return games[randomIndex];
}

export function getRelevantGames(game: Game, games: Game[]): Game[] {
  return games.filter(
    (currentGame) =>
      currentGame.genre === game.genre && currentGame.id !== game.id
  );
}

export function sortGamesByDate(games: Game[]) {
  return games.toSorted(
    (game1, game2) =>
      new Date(game1.release_date).getTime() -
      new Date(game2.release_date).getTime()
  );
}

export function sortGamesByAlphabetic(games: Game[]) {
  return games.toSorted((game1, game2) =>
    game1.title.localeCompare(game2.title)
  );
}

// todo: refactor with generics
export function calculateCategory(
  category: keyof Game,
  games: Game[]
): string[] {
  return games
    .reduce((categoryList, game) => {
      const currentCategory = String(game[category]);
      if (!categoryList.includes(currentCategory)) {
        categoryList.push(currentCategory.trim());
      }
      return categoryList;
    }, [] as string[])
    .sort((a, b) => a.localeCompare(b));
}
