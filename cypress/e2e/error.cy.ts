describe("template spec", () => {
  Cypress.on("uncaught:exception", () => false);

  // beforeEach(() => {
  //   cy.intercept(
  //     "GET",
  //     "https://free-to-play-games-database.p.rapidapi.com/api/games?sort-by=relevance",
  //     {
  //       fixture: "mockGames",
  //     }
  //   ).as("allGames");

  //   cy.intercept(
  //     "GET",
  //     "https://free-to-play-games-database.p.rapidapi.com/api/game?id=*",
  //     {
  //       fixture: "mockGameFull",
  //     }
  //   ).as("game");
  // });

  const baseUrl = Cypress.config("baseUrl");

  it("Should return error on failed to fetch game", () => {
    cy.intercept(
      "GET",
      "https://free-to-play-games-database.p.rapidapi.com/api/games?sort-by=relevance",
      {
        statusCode: 500,
      }
    ).as("mockGames");

    cy.visit("/");
    cy.getTestId("error-component").contains(
      "Could not get games from the server. Try again later"
    );

    cy.visit("/database");
    cy.getTestId("error-component").contains(
      "Could not get games from the server. Try again later"
    );
  });

  it("should show 404 page", () => {
    cy.intercept(
      "GET",
      "https://free-to-play-games-database.p.rapidapi.com/api/games?sort-by=relevance",
      {
        fixture: "mockGames",
      }
    ).as("mockGames");

    cy.visit("/notarealpage");
    cy.getTestId("error-component").contains("Cannot find page");
  });

  it("should show unable to find game page", () => {
    cy.intercept(
      "GET",
      "https://free-to-play-games-database.p.rapidapi.com/api/games?sort-by=relevance",
      {
        fixture: "mockGames",
      }
    ).as("mockGames");

    cy.intercept(
      "GET",
      "https://free-to-play-games-database.p.rapidapi.com/api/game?id=*",
      {
        statusCode: 500,
      }
    ).as("game");

    cy.visit("/game/1337");
    cy.wait(["@mockGames", "@game"]).then(() => {
      cy.getTestId("error-component").contains(
        "There is no game with 1337 on the server"
      );
    });
  });
});
