import FileInput from "@/views/AddOffer/FileInput.vue"

describe('FileInput.cy.js', () => {

  it("Loads and shows files for upload and emits upload event", () => {
    const uploadSpy = cy.spy().as('uploadSpy')
    cy.mount(FileInput, { props: { onUpload: uploadSpy } })
    cy.get('.file-input-button').selectFile('cypress/fixtures/images/testPicture.jpeg').trigger("change")
    cy.get("@uploadSpy").should("have.been.calledOnce")
    cy.get(".images").children().should('have.length', 1)
  })

  it("Loads and shows files with drag and drop and emits upload event + adds and removes classes on dragenter and dragleave", () => {
    const uploadSpy = cy.spy().as('uploadSpy')
    cy.mount(FileInput, { props: { onUpload: uploadSpy } })
    cy.get('.file-input-dropzone').trigger("dragenter").should("have.class", "active")
      .attachFile(['images/testPicture.jpeg', 'images/testPicture2.jpg'], { subjectType: 'drag-n-drop' })
    cy.get("@uploadSpy").should("have.been.calledTwice")
    /* eslint-disable cypress/no-unnecessary-waiting */
    cy.wait(50)
    cy.get('.file-input-dropzone').should("not.have.class", "active")
    cy.get(".images").children().should('have.length', 2)
  })

  it("Prevents non image file from being dropped in", () => {
    cy.mount(FileInput)
    cy.get('.file-input-dropzone').attachFile("testTextFile.txt", { subjectType: 'drag-n-drop' })
    cy.get(".images").should("not.exist")
  })

  it("Removes files when right clicking them and emits remove event", () => {
    const removeSpy = cy.spy().as('removeSpy')
    cy.mount(FileInput, { props: { onRemove: removeSpy } })
    cy.get('.file-input-dropzone').attachFile(['images/testPicture.jpeg', 'images/testPicture2.jpg'], { subjectType: 'drag-n-drop' })
    cy.get(".images").children().should('have.length', 2).first().rightclick()
    cy.get("@removeSpy").should("have.been.calledOnce")
    cy.get(".images").children().should('have.length', 1)
  })

})