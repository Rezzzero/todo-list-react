describe("Login Page Test", () => {
  it("should login user successfully", () => {
    cy.visit("http://localhost:3001/login");
    cy.get('input[name="email"]').type("111kivachuk@gmail.com");
    cy.get('input[name="password"]').type("password123");
    cy.get('button[type="submit"]').click();
    cy.url().should("eq", "http://localhost:3001/");
  });
});
