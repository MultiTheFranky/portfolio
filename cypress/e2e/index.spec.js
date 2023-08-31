it('los titulos son correctos', () => {
  const page = cy.visit('http://localhost:4321');
  page.get('title').should('have.text', 'MultiTheFranky')
  page.get('h1').should('have.text', 'MultiTheFranky');
});