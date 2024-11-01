describe('Agregar a carrito', () => {
  it('Funciona', () => {
    cy.visit('http://localhost:5173/');
    cy.contains('Productos').click();
    cy.contains('Scott').click();
    cy.contains('Agregar al Carrito').click();
    cy.get('a[href="/Carrito"]').click();
  })
})