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

  it("will display generic page elements", () => {
    cy.wait("@allGames").then(() => {
      cy.get("header").should("have.length", 1);
      cy.get("footer").should("have.length", 1);
      cy.get("nav").should("have.length", 1);

      cy.getTestId("search-bar").should("have.length", 1);
      // search for first game
      cy.getTestId("search-bar").get("input").type("World");
      cy.getTestId("search-result").should("have.length", 2);
      cy.getTestId("search-bar").get("input").type(" of Tanks");
      cy.getTestId("search-result").should("have.length", 1);
      cy.getTestId("search-result").first().contains("World of Tanks");
      cy.getTestId("search-result").first().click();
      cy.url().should("include", `${baseUrl}/game/409`);
      // search for second game
      cy.getTestId("search-bar").get("input").type("G");
      cy.getTestId("search-result").should("have.length", 2);
      cy.getTestId("search-result").first().contains("Genshin Impact");
      cy.getTestId("search-result").first().click();
      cy.url().should("include", `${baseUrl}/game/541`);

      // random nav button test #1
      cy.getTestId("nav-random-button")
        .click()
        .url()
        .then((url) => {
          const gameNumber = url.split("/").at(-1);
          cy.wrap(url).should("include", `${baseUrl}/game/${gameNumber}`);
        })
        .visit("/");
      // random nav button test #2
      cy.getTestId("nav-random-button")
        .click()
        .url()
        .then((url) => {
          const gameNumber = url.split("/").at(-1);
          cy.wrap(url).should("include", `${baseUrl}/game/${gameNumber}`);
        })
        .visit("/");
    });
  });

  it("should use the random filter button", () => {
    cy.wait("@allGames").then(() => {
      cy.getTestId("category-select").should("have.length", 2);
      cy.getTestId("category-select")
        .first()
        .find("option")
        .should("have.length", 5)
        .then((options) => {
          cy.wrap(options).contains("MMORPG");
          cy.wrap(options).contains("RPG");
          cy.wrap(options).contains("Shooter");
        });
      cy.getTestId("category-select")
        .last()
        .find("option")
        .should("have.length", 4)
        .then((options) => {
          cy.wrap(options).contains("PC (Windows)");
          cy.wrap(options).contains("Web Browser");
        });

      cy.getTestId("main-random-button")
        .click()
        .url()
        .then((url) => {
          const gameNumber = url.split("/").at(-1);
          cy.wrap(url).should("include", `${baseUrl}/game/${gameNumber}`);
        })
        .visit("/");

      cy.getTestId("category-select")
        .first()
        .select("MMORPG")
        .getTestId("main-random-button")
        .click()
        .url()
        .then((url) => {
          const gameNumber = url.split("/").at(-1);
          cy.wrap(url).should("include", `${baseUrl}/game/${gameNumber}`);
        })
        .visit("/");

      cy.getTestId("category-select")
        .last()
        .select("Web Browser")
        .getTestId("main-random-button")
        .click()
        .url()
        .then((url) => {
          const gameNumber = url.split("/").at(-1);
          cy.wrap(url).should("include", `${baseUrl}/game/${gameNumber}`);
        })
        .visit("/");
    });
  });

  it("Should display the trending games", () => {
    cy.getTestId("game-display-item").should("have.length", 3);
    cy.getTestId("game-display-item")
      .first()
      .then((item) => {
        cy.wrap(item)
          .find("img")
          .should("have.attr", "src")
          .should(
            "include",
            "https://placehold.co/365x206?text=World+of+Tanks"
          );

        cy.wrap(item)
          .click()
          .url()
          .should("include", `${baseUrl}/game/409`)
          .visit("/");
      });

    cy.getTestId("game-display-item")
      .last()
      .then((item) => {
        cy.wrap(item)
          .find("img")
          .should("have.attr", "src")
          .should("include", "https://placehold.co/365x206?text=Apex+Legends");

        cy.wrap(item)
          .click()
          .url()
          .should("include", `${baseUrl}/game/489`)
          .visit("/");
      });
  });

  it("should display new games", () => {
    cy.getTestId("game-list-card").should("have.length", 5);

    // first newest game
    cy.getTestId("game-list-card")
      .first()
      .then((card) => {
        cy.wrap(card)
          .find("img")
          .should("have.attr", "src")
          .should(
            "include",
            "https://placehold.co/365x206?text=Genshin+Impact"
          );
        cy.wrap(card).contains("Genshin Impact");
        cy.wrap(card).find("button").should("have.length", 2);
        cy.wrap(card).find("svg").should("have.length", 1);
        cy.wrap(card).contains("RPG");
        cy.wrap(card).contains(
          "An open-world action RPG game set in the fantasy world of Teyvat."
        );
      });

    cy.getTestId("game-list-card")
      .first()
      .findTestId("game-list-details-button")
      .click()
      .url()
      .should("include", `${baseUrl}/game/541`)
      .visit("/");

    cy.getTestId("game-list-card")
      .first()
      .find("a")
      .last()
      .should("have.attr", "href")
      .should("include", "https://www.freetogame.com/open/genshin-impact");

    // last newest game
    cy.getTestId("game-list-card")
      .last()
      .then((card) => {
        cy.wrap(card)
          .find("img")
          .should("have.attr", "src")
          .should("include", "https://placehold.co/365x206?text=Paladins");
        cy.wrap(card).contains("Paladins");
        cy.wrap(card).find("button").should("have.length", 2);
        cy.wrap(card).find("svg").should("have.length", 1);
        cy.wrap(card).contains("Shooter");
        cy.wrap(card).contains(
          "Join 25+ million players in Paladins, the free-to-play fantasy team-based shooter sensation."
        );
      });

    cy.getTestId("game-list-card")
      .last()
      .findTestId("game-list-details-button")
      .click()
      .url()
      .should("include", `${baseUrl}/game/365`)
      .visit("/");

    cy.getTestId("game-list-card")
      .last()
      .find("a")
      .last()
      .should("have.attr", "href")
      .should("include", "https://www.freetogame.com/open/paladins");
  });
});
