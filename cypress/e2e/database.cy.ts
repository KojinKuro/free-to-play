describe("template spec", () => {
  beforeEach(() => {
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
        fixture: "mockGameFull",
      }
    ).as("game");

    cy.visit("/database");
  });

  const baseUrl = Cypress.config("baseUrl");

  it("should have a working carousel", () => {
    cy.wait("@mockGames").then((mockGames) => {
      // we only display 5 but because the carousel is infinite loading we should have 9 items in the carousel
      cy.getTestId("game-feature-card").should("have.length", 9);
      // test the first item in the carousel
      cy.get(".react-multi-carousel-item--active")
        .find("img")
        .should("have.attr", "src")
        .should("include", "https://placehold.co/365x206?text=World+of+Tanks");

      cy.get(".react-multi-carousel-item--active")
        .findTestId("game-feature-card")
        .then((card) => {
          cy.wrap(card).contains("World of Tanks");
          cy.wrap(card).contains(
            "A free-to-play tank MMO with gameplay that is easy to learn but hard to master."
          );
          cy.wrap(card).find("svg").should("have.length", 1);
          cy.wrap(card).click().url().should("include", `${baseUrl}/game/409`);
        })
        .visit("/database");
    });
  });

  it("should have a working grid", () => {
    cy.getTestId("game-grid-card").should("have.length", 10);
    // test first game in grid
    cy.getTestId("game-grid-card")
      .first()
      .then((card) => {
        cy.wrap(card)
          .find("img")
          .should("have.attr", "src")
          .should(
            "include",
            "https://placehold.co/365x206?text=World+of+Tanks"
          );

        cy.wrap(card).find("svg").should("have.length", 1);
        cy.wrap(card).findTestId("badge").should("have.length", 1);
        cy.wrap(card).findTestId("badge").contains("Shooter");
        cy.wrap(card).contains(
          "A free-to-play tank MMO with gameplay that is easy to learn but hard to master."
        );
      });

    // test last game in grid
    cy.getTestId("game-grid-card")
      .last()
      .then((card) => {
        cy.wrap(card)
          .find("img")
          .should("have.attr", "src")
          .should("include", "https://placehold.co/365x206?text=War+Thunder");

        cy.wrap(card).find("svg").should("have.length", 1);
        cy.wrap(card).findTestId("badge").should("have.length", 1);
        cy.wrap(card).findTestId("badge").contains("Shooter");
        cy.wrap(card).contains(
          "A free-to-play vehicular combat multiplayer video game developed and published by Gaijin Entertainment."
        );
      });

    // test the category selects here for performance purposes
    cy.getTestId("game-filter").find("select").should("have.length", 3);
    // everything below will test grid affected by filtering
    cy.getTestId("game-filter").find("select").eq(0).select("M");
  });
});
