describe("Home Page", () => {
    it("should load the home page", () => {
      cy.visit("/"); // Visits the home page
      cy.contains("Welcome to Remix!"); // Checks if the page contains this text
    });
  
    it("should navigate to another page", () => {
      cy.visit("/");
      cy.get("a[href='/about']").click(); // Click on the 'About' link
      cy.url().should("include", "/about"); // Verify URL
      cy.contains("About Us"); // Verify content on the about page
    });
  });
  