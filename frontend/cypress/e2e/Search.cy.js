describe('Searching with SearchBar component', () => {
  beforeEach(() => {
    cy.visit("http://localhost:8080/")
  })

  it("Redirects to SearchResults view after pressing search button and sets query string into url, shows search results and redirects to clicked offer", () => {
    cy.get('[data-cy="search-category"] > select').select("Osobné a úžitkové autá")
    cy.get('[data-cy="search-make"] > select').select(1)
    cy.get('[data-cy="search-model"] > input').type("A25")
    cy.get('[data-cy="search-fuel"] > select').select(1)
    cy.get('[data-cy="search-year"] > input').type("2020")
    cy.get('[data-cy="search-km"] > input').type("100000")
    cy.get('[data-cy="search-price"] > input').type("10000")
    cy.get('[data-cy="search-submit"]').click()
    cy.url().should("include", "http://localhost:8080/searchResults")
      .and("include", "?category")
      .and("include", "make")
      .and("include", "model")
      .and("include", "fuel")
      .and("include", "year")
      .and("include", "km")
      .and("include", "price")

    cy.get('[data-cy="offers-list"]').should("exist").children().first().click()
    cy.url().should("include", "http://localhost:8080/offer/")
  })

  it("Shows correct message if no offers were found", () => {
    cy.get('[data-cy="search-category"] > select').select("Osobné a úžitkové autá")
    cy.get('[data-cy="search-year"] > input').type("9999")
    cy.get('[data-cy="search-submit"]').click()

    cy.get('[data-cy="offers-list"]').should("not.exist")
    cy.get('[data-cy="no-offers-found"]').should("exist").and("contain", "Nenašli sa žiadne výsledky")
  })

  it("Shows error message if there is any error and loading message while request is resolving", () => {
    cy.get('[data-cy="search-category"] > select').select("Osobné a úžitkové autá")
    cy.intercept("GET", "http://localhost:8080/api/offers/search*", {
      statusCode: 400,
      body: {
        error: "Missing query string",
      },
      delay: 1000
    }).as("search")
    cy.get('[data-cy="search-submit"]').click()
    cy.url().should("include", "http://localhost:8080/searchResults")
    cy.get('[data-cy="offers-list"]').should("not.exist")
    cy.get('[data-cy="search-offer-fetch-loading"]').should("exist").and("contain", "Načítavanie...")
    cy.wait('@search')

    cy.get('[data-cy="search-offer-fetch-error"]').should("exist").and("contain", "Could not fetch the data")
  })

})