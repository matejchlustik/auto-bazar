import FileInput from "@/views/AddOffer/FileInput.vue"

describe('FileInput.cy.js', () => {
  beforeEach(() => {
    cy.mount(FileInput)
  })

  it("Loads and shows files for upload", () => {
    cy.get('.file-input-button').selectFile('cypress/fixtures/images/testPicture.jpeg').trigger("change")
    cy.get(".images").children().should('have.length', 1)
  })

  it("Loads and shows files with drag and drop", () => {
    cy.get('.file-input-dropzone').trigger("dragenter").should("have.class", "active")
      .attachFile(['images/testPicture.jpeg', 'images/testPicture2.jpg'], { subjectType: 'drag-n-drop' }).trigger("dragleave")
    /* eslint-disable cypress/no-unnecessary-waiting */
    cy.wait(50)
    cy.get('.file-input-dropzone').should("not.have.class", "active")
    cy.get(".images").children().should('have.length', 2)
  })

  it("Prevents non image file from being dropped in", () => {
    cy.get('.file-input-dropzone').attachFile("testTextFile.txt", { subjectType: 'drag-n-drop' })
    cy.get(".images").should("not.exist")
  })

  it("Removes files when right clicking them", () => {
    cy.get('.file-input-dropzone').attachFile(['images/testPicture.jpeg', 'images/testPicture2.jpg'], { subjectType: 'drag-n-drop' })
    cy.get(".images").children().should('have.length', 2).first().rightclick()
    cy.get(".images").children().should('have.length', 1)
  })

})