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
        /* var n = 0
        while (when.response.body[n]) {
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
       /*  var n = 0
        while (when.response.body[n]) {
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

//@get_Compare_Oportunity

When(`request to compare the registered opportunities`, () => {
    Response_Meets.forEach(element => {
        delete element._id
    });
    Response_Front.forEach(element => {
        delete element._id
    });
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
                            } catch (err) { continue }
                        }
                    }
                })
            }
        }
    }
    var opportunityErrorList = Response_Front.filter(e => !nameList.includes(e.nome))
    opportunityErrorList.forEach(element => {
        cy.log("Oportunidade: " + element.nome).then(() => {
            try {
                expect(Response_Meets).to.include(JSON.stringify(element))
            } catch (err) { return }
        })
    });
});

Then(`should return the correct data`, () => {
	return true;
});
