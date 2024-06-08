import { SortBy } from "../../src/types/enum";

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

    // test genre filtering
    cy.getTestId("game-filter").find("select").eq(0).select("MMORPG");
    cy.getTestId("game-grid-card").should("have.length", 1);
    cy.getTestId("game-grid-card")
      .first()
      .then((card) => {
        cy.wrap(card)
          .find("img")
          .should("have.attr", "src")
          .should(
            "include",
            "https://placehold.co/365x206?text=Star+Trek+Online"
          );

        cy.wrap(card).find("svg").should("have.length", 1);
        cy.wrap(card).findTestId("badge").should("have.length", 1);
        cy.wrap(card).findTestId("badge").contains("MMORPG");
        cy.wrap(card).contains(
          "Explore strange new worlds, seek out new life and new civilizations, and boldly go in this expanding vast universe."
        );
      });
    // test platform filtering
    cy.getTestId("game-filter").find("select").eq(1).select("Web Browser");
    cy.getTestId("game-grid-card").should("not.exist");
    // reset filter
    cy.getTestId("game-filter")
      .find("select")
      .then((selects) => {
        cy.wrap(selects).eq(0).select("All");
        cy.wrap(selects).eq(1).select("All");
      });
    // sort by alphabetic
    cy.getTestId("game-filter").find("select").eq(2).select(SortBy.ALPHABETIC);
    cy.getTestId("game-grid-card").should("have.length", 10);
    cy.getTestId("game-grid-card")
      .first()
      .find("img")
      .should("have.attr", "src")
      .should("include", "https://placehold.co/365x206?text=Apex+Legends");
    cy.getTestId("game-grid-card")
      .first()
      .then((card) => {
        cy.wrap(card).find("svg").should("have.length", 1);
        cy.wrap(card).findTestId("badge").should("have.length", 1);
        cy.wrap(card).findTestId("badge").contains("Shooter");
        cy.wrap(card).contains(
          "A free-to-play strategic battle royale game featuring 60-player matches and team-based play."
        );
      });
    cy.getTestId("game-grid-card")
      .last()
      .find("img")
      .should("have.attr", "src")
      .should("include", "https://placehold.co/365x206?text=World+of+Warships");
    cy.getTestId("game-grid-card")
      .last()
      .then((card) => {
        cy.wrap(card).find("svg").should("have.length", 1);
        cy.wrap(card).findTestId("badge").should("have.length", 1);
        cy.wrap(card).findTestId("badge").contains("Shooter");
        cy.wrap(card).contains(
          "Experience naval combat like never before! World of Warships lets you experience epic naval combat like never before."
        );
      });
    // sort by alphabetic reverse
    cy.getTestId("game-filter")
      .find("select")
      .eq(2)
      .select(SortBy.ALPHABETIC_REVERSE);
    cy.getTestId("game-grid-card").should("have.length", 10);
    cy.getTestId("game-grid-card")
      .first()
      .find("img")
      .should("have.attr", "src")
      .should("include", "https://placehold.co/365x206?text=World+of+Warships");
    cy.getTestId("game-grid-card")
      .first()
      .then((card) => {
        cy.wrap(card).find("svg").should("have.length", 1);
        cy.wrap(card).findTestId("badge").should("have.length", 1);
        cy.wrap(card).findTestId("badge").contains("Shooter");
        cy.wrap(card).contains(
          "Experience naval combat like never before! World of Warships lets you experience epic naval combat like never before."
        );
      });
    cy.getTestId("game-grid-card")
      .last()
      .find("img")
      .should("have.attr", "src")
      .should("include", "https://placehold.co/365x206?text=Apex+Legends");
    cy.getTestId("game-grid-card")
      .last()
      .then((card) => {
        cy.wrap(card).find("svg").should("have.length", 1);
        cy.wrap(card).findTestId("badge").should("have.length", 1);
        cy.wrap(card).findTestId("badge").contains("Shooter");
        cy.wrap(card).contains(
          "A free-to-play strategic battle royale game featuring 60-player matches and team-based play."
        );
      });

    // // sort by newest
    cy.getTestId("game-filter").find("select").eq(2).select(SortBy.NEWEST);
    cy.getTestId("game-grid-card").should("have.length", 10);
    cy.getTestId("game-grid-card")
      .first()
      .find("img")
      .should("have.attr", "src")
      .should("include", "https://placehold.co/365x206?text=Genshin+Impact");
    cy.getTestId("game-grid-card")
      .first()
      .then((card) => {
        cy.wrap(card).find("svg").should("have.length", 1);
        cy.wrap(card).findTestId("badge").should("have.length", 1);
        cy.wrap(card).findTestId("badge").contains("RPG");
        cy.wrap(card).contains(
          "An open-world action RPG game set in the fantasy world of Teyvat."
        );
      });
    cy.getTestId("game-grid-card")
      .last()
      .find("img")
      .should("have.attr", "src")
      .should("include", "https://placehold.co/365x206?text=Star+Trek+Online");
    cy.getTestId("game-grid-card")
      .last()
      .then((card) => {
        cy.wrap(card).find("svg").should("have.length", 1);
        cy.wrap(card).findTestId("badge").should("have.length", 1);
        cy.wrap(card).findTestId("badge").contains("MMORPG");
        cy.wrap(card).contains(
          "Explore strange new worlds, seek out new life and new civilizations, and boldly go in this expanding vast universe."
        );
      });
    // // sort by oldest
    cy.getTestId("game-filter").find("select").eq(2).select(SortBy.OLDEST);
    cy.getTestId("game-grid-card").should("have.length", 10);
    cy.getTestId("game-grid-card")
      .first()
      .find("img")
      .should("have.attr", "src")
      .should("include", "https://placehold.co/365x206?text=Star+Trek+Online");
    cy.getTestId("game-grid-card")
      .first()
      .then((card) => {
        cy.wrap(card).find("svg").should("have.length", 1);
        cy.wrap(card).findTestId("badge").should("have.length", 1);
        cy.wrap(card).findTestId("badge").contains("MMORPG");
        cy.wrap(card).contains(
          "Explore strange new worlds, seek out new life and new civilizations, and boldly go in this expanding vast universe."
        );
      });
    cy.getTestId("game-grid-card")
      .last()
      .find("img")
      .should("have.attr", "src")
      .should("include", "https://placehold.co/365x206?text=Genshin+Impact");
    cy.getTestId("game-grid-card")
      .last()
      .then((card) => {
        cy.wrap(card).find("svg").should("have.length", 1);
        cy.wrap(card).findTestId("badge").should("have.length", 1);
        cy.wrap(card).findTestId("badge").contains("RPG");
        cy.wrap(card).contains(
          "An open-world action RPG game set in the fantasy world of Teyvat."
        );
      });
  });
});
