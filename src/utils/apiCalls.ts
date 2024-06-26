import { Game, GameFull } from "../types/interface";

const API_URL: string =
  "https://free-to-play-games-database.p.rapidapi.com/api";

export function getGames(): Promise<Game[]> {
  return fetch(API_URL + "/games?sort-by=relevance", {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "517a7f1c4emsh0b59a6d7601c458p1978d3jsn390bd0aad9cf",
      "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
    },
  }).then((res) => {
    if (!res.ok)
      throw new Error("Could not get games from the server. Try again later");
    return res.json();
  });
}

export function getGame(id: string | number | undefined): Promise<GameFull> {
  return fetch(API_URL + `/game?id=${id}`, {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "517a7f1c4emsh0b59a6d7601c458p1978d3jsn390bd0aad9cf",
      "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
    },
  }).then((res) => {
    if (!res.ok) throw new Error(`There is no game with ${id} on the server`);
    return res.json();
  });
}
