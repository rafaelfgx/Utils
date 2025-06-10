const add = (a, b) => a + b

const subtract = (a, b) => a - b

const divide = (a, b) => a / b

const multiply = (a, b) => a * b

describe("Math", () => {
    it("Add", () => expect(add(5, 10)).to.eq(15))

    it("Subtract", () => expect(subtract(15, 5)).to.eq(10))

    it("Divide", () => expect(divide(10, 2)).to.eq(5))

    it("Divide by Zero", () => expect(divide(10, 0)).to.eq(Infinity))

    it("Multiply", () => expect(multiply(2, 5)).to.eq(10))
})
