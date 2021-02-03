export default class Rest {
  static get(endpoint) {
    return cy.request({
      method: 'GET',
      url: endpoint,
      failOnStatusCode: false
    })
  }
}
