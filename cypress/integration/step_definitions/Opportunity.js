import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'
import Opportunity from "../../services/opportunity.service.js"

var Response_Meets, Response_Front
var wrongOpp = []
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
        cy.validateSchema(when.response.body[n], `${schema}/${status}`)
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
        cy.validateSchema(when.response.body[n], `${schema}/${status}`)
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

Then(`should return opportunities that have the same data info`, () => {
    var nameList = []
    for (let i = 0; i < Response_Front.length; i++) {
        for (let j = 0; j < Response_Meets.length; j++) {
            if (Response_Front[i].nome === Response_Meets[j].nome) {
                nameList.push(Response_Front[i].nome)
                cy.log("Oportunidade: " + Response_Front[i].nome).then(() => {
                    if (JSON.stringify(Response_Front[i]) == JSON.stringify(Response_Meets[j])) {
                        expect(JSON.stringify(Response_Front[i])).to.eq(JSON.stringify(Response_Meets[j]))
                    } else {
                        for (var eachProperty in Response_Front[i]) {
                            try {
                                expect(Response_Front[i][eachProperty]).to.eq(Response_Meets[j][eachProperty])
                            } 
                            catch (err) { 
                                wrongOpp.push(Response_Front[j]);
                                continue 
                            }
                        }
                    }
                })
            }
        }
    }
    
    var opportunityErrorList = Response_Front.filter(e => !nameList.includes(e.nome))
    cy.wrap({ opportunityErrorList }).as("OppEL")
});

Then(`should return that opportunities are registered at both endpoints`, () => {
    cy.get("@OppEL").then(when => {
        when.opportunityErrorList.forEach(element => {
            cy.log("Oportunidade: " + element.nome).then(() => {
                try {
                    expect(Response_Meets).to.include(JSON.stringify(element))
                } catch (err) { return }
            })
        })
    })
});

Then(`should return an Array with wrong Opportunities`, () => {
    if(wrongOpp.length == 0) {
      cy.log("Not found wrong opportunities")
    }
    else {
      cy.log("Wrong opportunities: " + JSON.stringify(wrongOpp))
    }
});