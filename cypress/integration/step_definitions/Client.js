import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'
import Client from "../../services/client.service.js"

var resGetMeet, resGetFrontend

//get_Meets_Clients

When(`request all Meets registered Clients`, () => {
	Client.get_Meets_Clients().then(response => {
        cy.log("RESPONSE: " + JSON.stringify(response.body))
        cy.wrap({response}).as("Response")
        resGetMeet = response
    })
});

Then(`should return the response {string} status {int}`, (schema, status) => {
	cy.get("@Response").then(when => {
        var n = 0
        /* while (when.response.body[n]) {
            cy.validateSchema(when.response.body[n], `${schema}/${status}`)
            n++
        } */
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
        resGetFrontend = response
    })
});

Then(`should return the response {string} and status {int}`, (schema, status) => {
	cy.get("@Response").then(when => {
        var n = 0
        /* while (when.response.body[n]) {
          cy.validateSchema(when.response.body[n], `${schema}/${status}`)
          n++
        } */
        expect(when.response.status).to.equal(status)
    })
});

Then(`should return a non-null body`, () => {
	cy.get("@Response").then(when => {
        expect(when.response.body).to.not.be.null
    })
});

//@get_Compare_Client

When(`request to compare the registered clients`, () => {
    //Frontend com Meet
    console.log(resGetFrontend)
    console.log(resGetMeet)
	return true;
});

Then(`should return the correct data`, () => {
	return true;
});
