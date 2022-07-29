import FormInput from "@/components/FormInput.vue"

describe('FormInput.cy.js', () => {
  it("Contains typed text", () => {
    const text = "Username"

    cy.mount(FormInput, { props: { type: "text" } })
    cy.get("input").type(text).should("have.value", text)
  })
})