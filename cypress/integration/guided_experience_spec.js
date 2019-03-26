const answer1 = "Answer 1";
const answer4 = "Answer 4";

describe("Guided Experience", function() {
  beforeEach(() => {
    cy.visit("/");
  });

  it("successfully loads start page", () => {
    cy.contains("Select who would be receiving the benefits.");
  });

  it("can skip through to benefits-directory", () => {
    cy.get("#a-skipButton").click();
    cy.url().should("include", "needs");
    cy.get("#a-skipButton").click();
    cy.url().should("include", "benefits-directory");
  });

  it("can choose some options and get to summary and benefits directory", () => {
    cy.contains(answer1).click();
    cy.get("#nextButton").click();
    cy.url().should("include", "another_question?");
    cy.contains(answer4).click();
    cy.get("#nextButton").click();
    cy.url().should("include", "needs");
    cy.get("#nextButton").click();
    cy.url().should("include", "benefits-directory");
    cy.contains("Benefit 1");
  });

  it("can go back from summary and edit answer", () => {
    cy.visit("summary");
    cy.get("#edit-patronType").click();
    cy.contains("Select who would be receiving the benefits.");
  });
});
