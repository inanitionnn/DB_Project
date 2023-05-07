describe("Sneakers test", () => {
  it("Login: contains", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Login");
    cy.contains("Email");
    cy.contains("Password");
    cy.contains("Sign in");
  });
  it("Login: User not found", () => {
    cy.visit("http://localhost:3000");
    cy.get("[data-testid=login-email-input]").type("someWrongEmail@gmail.com");
    cy.get("[data-testid=login-email-input]").should(
      "have.value",
      "someWrongEmail@gmail.com"
    );
    cy.get("[data-testid=login-password-input]").type("somePassword");
    cy.get("[data-testid=login-password-input]").should(
      "have.value",
      "somePassword"
    );
    cy.get("[data-testid=login-submit-button]").click();
    cy.contains("User not found");
  });
  it("Login: Wrong password", () => {
    cy.visit("http://localhost:3000");
    cy.get("[data-testid=login-email-input]").type("test@gmail.com");
    cy.get("[data-testid=login-email-input]").should(
      "have.value",
      "test@gmail.com"
    );
    cy.get("[data-testid=login-password-input]").type("somePassword");
    cy.get("[data-testid=login-password-input]").should(
      "have.value",
      "somePassword"
    );
    cy.get("[data-testid=login-submit-button]").click();
    cy.contains("Wrong password");
  });
  it("Login: Registration button", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Login");
    cy.get("[data-testid=registration-link]").click();
    cy.contains("Registration");
  });
  it("Registration: contains", () => {
    cy.visit("http://localhost:3000/registration");
    cy.contains("Registration");
    cy.contains("Name");
    cy.contains("Email");
    cy.contains("Password");
    cy.contains("Sign up");
    cy.contains("Back");
  });
  it("Registration: Back button", () => {
    cy.visit("http://localhost:3000/registration");
    cy.contains("Registration");
    cy.get("[data-testid=login-link]").click();
    cy.contains("Login");
  });
  it("Registration: Email already in use", () => {
    cy.visit("http://localhost:3000/registration");
    cy.get("[data-testid=registration-name-input]").type("someName");
    cy.get("[data-testid=registration-name-input]").should(
      "have.value",
      "someName"
    );
    cy.get("[data-testid=registration-email-input]").type(
      "someEmail@gmail.com"
    );
    cy.get("[data-testid=registration-email-input]").should(
      "have.value",
      "someEmail@gmail.com"
    );
    cy.get("[data-testid=registration-password-input]").type("somePassword");
    cy.get("[data-testid=registration-password-input]").should(
      "have.value",
      "somePassword"
    );
    cy.get("[data-testid=registration-submit-button]").click();
    cy.contains("This Email is already in use");
  });
  it("Main: Success login", () => {
    cy.visit("http://localhost:3000");
    cy.get("[data-testid=login-email-input]").type("test@gmail.com");
    cy.get("[data-testid=login-email-input]").should(
      "have.value",
      "test@gmail.com"
    );
    cy.get("[data-testid=login-password-input]").type("1234");
    cy.get("[data-testid=login-password-input]").should("have.value", "1234");
    cy.get("[data-testid=login-submit-button]").click();
    cy.contains("Sneakers Shop");
  });
  it("Main: Sneakers fetch", () => {
    cy.visit("http://localhost:3000");
    cy.get("[data-testid=login-email-input]").type("test@gmail.com");
    cy.get("[data-testid=login-email-input]").should(
      "have.value",
      "test@gmail.com"
    );
    cy.get("[data-testid=login-password-input]").type("1234");
    cy.get("[data-testid=login-password-input]").should("have.value", "1234");
    cy.get("[data-testid=login-submit-button]").click();
    cy.contains("Sneakers Shop");
    cy.contains("Sneaker Blue");
    cy.contains("add to cart");
  });
  it("Main: Add to cart", () => {
    cy.visit("http://localhost:3000");
    cy.get("[data-testid=login-email-input]").type("test@gmail.com");
    cy.get("[data-testid=login-email-input]").should(
      "have.value",
      "test@gmail.com"
    );
    cy.get("[data-testid=login-password-input]").type("1234");
    cy.get("[data-testid=login-password-input]").should("have.value", "1234");
    cy.get("[data-testid=login-submit-button]").click();
    cy.get("[data-testid=blue-button]").click();
    cy.contains("Sneaker Blue added to cart");
  });
  it("Main: Cart", () => {
    cy.visit("http://localhost:3000");
    cy.get("[data-testid=login-email-input]").type("test@gmail.com");
    cy.get("[data-testid=login-email-input]").should(
      "have.value",
      "test@gmail.com"
    );
    cy.get("[data-testid=login-password-input]").type("1234");
    cy.get("[data-testid=login-password-input]").should("have.value", "1234");
    cy.get("[data-testid=login-submit-button]").click();
    cy.get("[data-testid=cart-link]").click();
    cy.contains("Cart");
  });
  // ...
});
