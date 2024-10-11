describe("task functionality", () => {
  before(() => {
    cy.visit("http://localhost:3001/login");
    cy.get('input[name="email"]').type("111kivachuk@gmail.com");
    cy.get('input[name="password"]').type("password123");
    cy.get('button[type="submit"]').click();
    cy.url().should("eq", "http://localhost:3001/");
  });

  it("should create task successfully", () => {
    cy.visit("http://localhost:3001/");
    cy.get('[data-testid="create-task-list"]').click();
    cy.contains("Новый список задач").should("be.visible");
    cy.get('input[name="task_name"]').type("test task").type("{enter}");
    cy.contains("test task").should("be.visible");
    cy.get('[data-testid="delete-task-list"]').click();
    cy.contains("test task").should("not.exist");
  });
});
