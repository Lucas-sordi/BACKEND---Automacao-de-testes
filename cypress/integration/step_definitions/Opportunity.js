import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'
import Opportunity from "../../services/opportunity.service.js"

var Response_Meets, Response_Front

//get_Meets_Opportunities

When(`request all Meets registered Opportunities`, () => {
	Opportunity.get_Meets_Opportunities().then(response => {
		cy.log("RESPONSE: " + JSON.stringify(response.body))
        cy.wrap({response}).as("Response")
        Response_Meets = response.body
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

//get_Frontend_Opportunities

When(`request all Front-end registered Opportunities`, () => {
	Opportunity.get_Frontend_Opportunities().then(response => {
		cy.log("RESPONSE: " + JSON.stringify(response.body))
        cy.wrap({response}).as("Response")
        Response_Front = response.body
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

//@get_Compare_Oportunity

When(`compare all registered Opportunities on the platform with front-end`, () => {
    Response_Meets.forEach(element => {
        delete element._id
    });
    Response_Front.forEach(element => {
        delete element._id
    });
});

var opportunityErrorList = []
var errList = []

Then(`should validate Opportunities who have same name on both Endpoints`, () => {
    var nameList = []
    for (let i = 0; i < Response_Front.length; i++) {
        for (let j = 0; j < Response_Meets.length; j++) {
            if (Response_Front[i].nome === Response_Meets[j].nome) {
                nameList.push(Response_Front[i].nome)
                cy.log("Opportunity Name: " + Response_Front[i].nome).then(() => {
                    if (JSON.stringify(Response_Front[i]) == JSON.stringify(Response_Meets[j])) {
                        expect(JSON.stringify(Response_Front[i])).to.eq(JSON.stringify(Response_Meets[j]))
                    } else {
                        for (var eachProperty in Response_Front[i]) {
                            try {
                                expect(Response_Front[i][eachProperty]).to.eq(Response_Meets[j][eachProperty])
                            } 
                            catch (err) {
                                errList.push(JSON.stringify(err.message))
                                continue 
                            }
                        }
                    }
                })
            }
        }
    }
    
    opportunityErrorList = Response_Front.filter(e => !nameList.includes(e.nome))
});

Then(`should return Opportunities who have only registered name on Front-end Endpoint`, () => {
    if (opportunityErrorList.length == 0) {
        cy.log("There are no Opportunities with Errors in this section")
    } else {
        opportunityErrorList.forEach(element => {
            cy.log("Opportunity Name: " + element.nome).then(() => {
                try {
                    expect(Response_Meets).to.include(JSON.stringify(element))
                } catch (err) { return }
            })
        })
    }
    
});

Then(`should validate if an Opportunity got an Error`, () => {
    if (errList.length > 0|| opportunityErrorList.length > 0) {
        throw new Error("An error occurred during the validation of the Clients")
    } else {
        cy.log("There are no Errors in this Test")
    }
});