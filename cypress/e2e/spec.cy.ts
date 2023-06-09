describe('check test', () => {
  it('select prefecture, view gragh ', () => {
    cy.visit('https://yumemi-frontend-coding-test-wheat.vercel.app/')
    cy.get('[id="岩手県"]').should('have.value', '3')
    cy.get('[id="岩手県"]').check({ force: true })
    cy.get('.highcharts-graph').should('be.visible')
    cy.get('.highcharts-title').should('have.text', '都道府県別総人口データ')
    cy.get('[id="年少人口"]').check({ force: true })
    cy.get('.highcharts-title').should('have.text', '都道府県別年少人口データ')
  })
})
