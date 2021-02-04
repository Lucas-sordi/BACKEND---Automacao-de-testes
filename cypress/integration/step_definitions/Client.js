import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'
import Client from "../../services/Client.service"

//get_Valid_Emails

When(`request all Valid Emails`, () => {
	Client.get_Valid_Emails().then(response => {
        cy.log("RESPONSE: " + JSON.stringify(response.body))
        cy.wrap({response}).as("Response")
    })
});

Then(`should return the response {string} status {int}`, (schema, status) => {
	cy.get("@Response").then(when => {
        //cy.validateSchema(when.response.body, `${schema}/${status}`)
        expect(when.response.status).to.equal(status)
    })
});

Then(`should return a non-null body`, () => {
	cy.get("@Response").then(when => {
        expect(when.response.body).to.not.be.null
    })
});

//get_Meets_Clients

When(`request all Meets registered Clients`, () => {
	Client.get_Meets_Clients().then(response => {
        cy.log("RESPONSE: " + JSON.stringify(response.body))
        cy.wrap({response}).as("Response")
    })
});

Then(`should return the response {string} status {int}`, (schema, status) => {
	cy.get("@Response").then(when => {
        cy.validateSchema(when.response.body, `${schema}/${status}`)
        expect(when.response.status).to.equal(status)
    })
});

Then(`should return a non-null body`, () => {
	cy.get("@Response").then(when => {
        expect(when.response.body).to.not.be.null
    })
});

//get_Frontend_Clients

When(`request all Front-end registered Clients`, () => {
	Client.get_Frontend_Clients().then(response => {
        cy.log("RESPONSE: " + JSON.stringify(response.body))
        cy.wrap({response}).as("Response")
    })
});

Then(`should return the response {string} status {int}`, (schema, status) => {
	cy.get("@Response").then(when => {
        cy.validateSchema(when.response.body, `${schema}/${status}`)
        expect(when.response.status).to.equal(status)
    })
});

Then(`should return a non-null body`, () => {
	cy.get("@Response").then(when => {
        expect(when.response.body).to.not.be.null
    })
});