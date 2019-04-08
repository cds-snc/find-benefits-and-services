describe("Guided Experience", function() {
  beforeEach(() => {
    cy.visit("/");
  });

  it("successfully loads start page", () => {
    cy.contains("Question 1");
  });

  it("can skip through to benefits-directory", () => {
    cy.get("#a-skipButton").click();
    cy.url().should("include", "needs");
    cy.get("#a-skipButton").click();
    cy.url().should("include", "benefits-directory");
  });

  it("can choose some options and get to summary and benefits directory", () => {
    cy.contains("retired").click();
    cy.get("#nextButton").click();
    cy.url().should("include", "patronLocation?");
    cy.contains("inside").click();
    cy.get("#nextButton").click();
    cy.url().should("include", "needs");
    cy.get("#nextButton").click();
    cy.url().should("include", "benefits-directory");
    cy.contains("Find a doctor");
  });

  it("can go back from summary and edit answer", () => {
    cy.visit("summary");
    cy.get("#edit-patronType").click();
    cy.contains("Question 1");
  });
});
