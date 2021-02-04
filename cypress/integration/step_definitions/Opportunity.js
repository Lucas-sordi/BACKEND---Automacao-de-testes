import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'
import Opportunity from "../../services/opportunity.service.js"

//get_Meets_Opportunities

When(`request all Meets registered Opportunities`, () => {
	Opportunity.get_Meets_Opportunities().then(response => {
		cy.log("RESPONSE: " + JSON.stringify(response.body))
        cy.wrap({response}).as("Response")
	})
});

Then(`should return the response {string} status {int}`, (schema, status) => {
	cy.get("@Response").then(when => {
        var n = 0
        while (when.response.body[n]) {
            cy.validateSchema(when.response.body[n], `${schema}/${status}`)
            n++
        }
        expect(when.response.status).to.equal(status)
    })
});

Then(`should return a non-null body`, () => {
	cy.get("@Response").then(when => {
        expect(when.response.body).to.not.be.null
    })
});

//get_Frontend_Opportunities

When(`request all Front-end registered Opportunities`, () => {
	Opportunity.get_Frontend_Opportunities().then(response => {
		cy.log("RESPONSE: " + JSON.stringify(response.body))
        cy.wrap({response}).as("Response")
	})
});

Then(`should return the response {string} status {int}`, (schema, status) => {
	cy.get("@Response").then(when => {
        var n = 0
        while (when.response.body[n]) {
            cy.validateSchema(when.response.body[n], `${schema}/${status}`)
            n++
        }
        expect(when.response.status).to.equal(status)
    })
});

Then(`should return a non-null body`, () => {
	cy.get("@Response").then(when => {
        expect(when.response.body).to.not.be.null
    })
});