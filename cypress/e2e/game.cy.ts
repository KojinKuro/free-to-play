describe("template spec", () => {
  beforeEach(() => {
    cy.intercept(
      "GET",
      "https://free-to-play-games-database.p.rapidapi.com/api/games?sort-by=relevance",
      {
        fixture: "mockGames",
      }
    ).as("allGames");

    cy.intercept(
      "GET",
      "https://free-to-play-games-database.p.rapidapi.com/api/game?id=*",
      {
        fixture: "mockGameFull",
      }
    ).as("game");

    cy.visit("/");
  });

  const baseUrl = Cypress.config("baseUrl");

  it("passes", () => {
    cy.visit("https://example.cypress.io");
  });
});
