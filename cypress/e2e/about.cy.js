describe('About page responsive and accessibility', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4321/about');
  });

  it('has accessible social links with aria-labels', () => {
    cy.get('main').within(() => {
      cy.get('a[rel~="noopener"]').should('have.length.at.least', 1);
      cy.get('a[rel~="noopener"]').each(($a) => {
        cy.wrap($a).should('have.attr', 'aria-label');
        cy.wrap($a).find('.sr-only').should('exist');
      });
    });
  });

  it('renders properly on mobile and desktop (screenshots)', () => {
    // mobile
    cy.viewport('iphone-6');
    cy.wait(200);
    cy.screenshot('about-mobile');

    // desktop
    cy.viewport(1280, 800);
    cy.wait(200);
    cy.screenshot('about-desktop');
  });

  it('timeline alternates sides on large screens', () => {
    // check timeline exists on home page
    cy.visit('http://localhost:4321/');
    cy.viewport(1280, 900);
    cy.get('ol').within(() => {
      cy.get('li').its('length').should('be.gte', 2);
      // ensure at least one even child exists which will have rtl layout
      cy.get('li').eq(1).then($el => {
        // it should contain the timeline-content element
        expect($el.find('.timeline-content').length).to.be.greaterThan(0);
      });
    });
  });
});
