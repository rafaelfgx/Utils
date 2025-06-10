describe("Browser", () => {
    describe("Login", () => {
        beforeEach(() => cy.visit("https://practicetestautomation.com/practice-test-login"))

        it("Invalid", () => {
            cy.get("input[name='username']").type("invalid")
            cy.get("input[name='password']").type("invalid")
            cy.get("button[id='submit']").click()
            cy.get("div#error").should("be.visible")
        })

        it("Valid", () => {
            cy.get("input[name='username']").type("student")
            cy.get("input[name='password']").type("Password123")
            cy.get("button[id='submit']").click()
            cy.url().should("contain", "logged-in-successfully")
        })
    })
})
