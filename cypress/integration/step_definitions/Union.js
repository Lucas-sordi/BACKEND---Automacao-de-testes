import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'
import Union from "../../services/union.service.js"

When(`search and find clients with repeated emails`, () => {
    //fazer aqui um loop para buscar e-mails repetidos
    //em seguida adicionar num objeto seguindo o padrao do doc
    //enviar o objeto como parametro do metodo "post_Union" da linha abaixo
	Union.post_Union().then(response => {
        cy.log("RESPONSE: " + JSON.stringify(response.body))
        cy.wrap({response}).as("Response")
    })
});

Then(`should return the response status {int}`, status => {
	cy.get("@Response").then(when => {    
        expect(when.response.status).to.equal(status)
    })
});

Then(`save the clients on the page`, () => {
	cy.get("@Response").then(when => {
        expect(when.response.body).to.not.be.null
        //adicionar verificaçoes
    })
});