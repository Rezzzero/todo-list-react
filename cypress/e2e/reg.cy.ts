describe("Registration Page Test", () => {
  it("should register user successfully", () => {
    cy.visit("http://localhost:3001/register");
    cy.get('input[name="email"]').type("111kivachuk@gmail.com");
    cy.get('input[name="username"]').type("testuser");
    cy.get('input[name="password"]').type("password123");
    cy.get('button[type="submit"]').click();

    cy.contains("Sign Up Successful").should("be.visible");

    cy.url().should("eq", "http://localhost:3001/login");
  });
});
