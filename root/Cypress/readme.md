# Cypress

## Links

* [Cypress](https://cypress.io)
* [Cypress Examples](https://example.cypress.io)
* [Joi](https://joi.dev)

## Run

1. Execute **npm i**
2. Execute **npm run cy:open** or **npm run cy:run**

## Examples

### Functions

```js
const add = (a, b) => a + b

const subtract = (a, b) => a - b

const divide = (a, b) => a / b

const multiply = (a, b) => a * b
```

```js
describe("Math", () => {
    it("Add", () => expect(add(5, 10)).to.eq(15))

    it("Subtract", () => expect(subtract(15, 5)).to.eq(10))

    it("Divide", () => expect(divide(10, 2)).to.eq(5))

    it("Divide by Zero", () => expect(divide(10, 0)).to.eq(Infinity))

    it("Multiply", () => expect(multiply(2, 5)).to.eq(10))
})
```

### API

```js
const url = "https://jsonplaceholder.cypress.io"

describe("API", () => {
    describe("Users", () => {
        it("Status 200", () => cy.request(`${url}/users`).its("status").should("eq", 200))
    })

    describe("Todos", () => {
        it("Status 200", () => cy.request(`${url}/todos`).its("status").should("eq", 200))

        it("Valid", () => {
            const schema = JOI.array().items(JOI.object({
                id: JOI.number(),
                title: JOI.string(),
                completed: JOI.bool(),
                userId: JOI.number()
            }))

            cy.request(`${url}/todos`).should((response) => JOI.assert(response.body, schema))
        })
    })
})
```

### Browser

```js
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
```
