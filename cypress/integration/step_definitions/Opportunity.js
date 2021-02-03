import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'
import Opportunity from "../../services/Opportunity.service"

//get_Meets_Opportunities

When(`request all Meets registered Opportunities`, () => {
	Opportunity.get_Meets_Opportunities().then(response => {
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

//get_Frontend_Opportunities

When(`request all Front-end registered Opportunities`, () => {
	Opportunity.get_Frontend_Opportunities().then(response => {
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
