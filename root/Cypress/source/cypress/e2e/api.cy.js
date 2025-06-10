import JOI from "joi"

const url = "https://jsonplaceholder.cypress.io"

describe("API", () => {
    describe("Users", () => {
        it("Valid", () => {
            cy.request(`${url}/users`).its("status").should("eq", 200)
        })
    })

    describe("Todos", () => {
        it("Valid", () => {
            const schema = JOI.array().items(JOI.object({
                id: JOI.number(),
                title: JOI.string(),
                completed: JOI.bool(),
                userId: JOI.number()
            }))

            cy.request(`${url}/todos`).should((response) => {
                expect(response.status).to.eq(200)
                expect(JOI.assert(response.body, schema)).to.be.undefined
            })
        })
    })
})
