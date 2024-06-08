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
    cy.visit("/game/409");
  });

  const baseUrl = Cypress.config("baseUrl");

  it("should display information properly", () => {
    cy.wait("@game").then(() => {
      cy.getTestId("game-splash")
        .find("img")
        .should("have.attr", "src")
        .should("include", "https://placehold.co/1920x1080?text=Screenshot+2");
      cy.getTestId("game-title").contains("World of Tanks");
      cy.getTestId("game-description").contains(
        "World of Tanks is a free-to-play tank MMO that features intense team-based combat. Players command a variety of tanks from different eras and nations, each with unique abilities and roles on the battlefield. The game emphasizes strategic gameplay, where coordination and tactics can turn the tide of battle."
      );
      cy.getTestId("game-details").then((details) => {
        cy.wrap(details).contains("Shooter");
        cy.wrap(details).contains("PC (Windows)");
        cy.wrap(details).contains("Wargaming");
        cy.wrap(details).contains("2011-08-12");
        cy.wrap(details)
          .find("a")
          .should("have.attr", "href")
          .should("include", "https://www.freetogame.com/open/world-of-tanks");
      });
      cy.getTestId("game-screenshots")
        .findTestId("game-screenshot")
        .then((screenshots) => {
          // due to using infinite carousel has 7 items instead of 3
          cy.wrap(screenshots).should("have.length", 7);
          cy.getTestId("game-screenshots")
            .find(".react-multi-carousel-item--active img")
            .should("have.attr", "src")
            .should(
              "include",
              "https://placehold.co/1920x1080?text=Screenshot+1"
            );
        });
      cy.getTestId("game-requirements").then((req) => {
        cy.wrap(req).contains("Windows 7/8/10");
        cy.wrap(req).contains("Intel Core i3 / AMD Ryzen 3");
        cy.wrap(req).contains("4GB");
        cy.wrap(req).contains("NVIDIA GeForce GT 1030 / AMD Radeon HD 7850");
        cy.wrap(req).contains("36 GB of free space");
      });
      cy.getTestId("game-relevant")
        .findTestId("game-display-item")
        .then((items) => {
          cy.wrap(items).should("have.length", 6);
          cy.wrap(items)
            .first()
            .find("img")
            .should("have.attr", "src")
            .should("include", "https://placehold.co/365x206?text=Warframe");
          cy.wrap(items)
            .last()
            .find("img")
            .should("have.attr", "src")
            .should("include", "https://placehold.co/365x206?text=War+Thunder");
        });
    });
  });
});
