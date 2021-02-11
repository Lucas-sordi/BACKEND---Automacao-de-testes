import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'
import Client from "../../services/client.service.js"

var Response_Meets, Response_Front

//get_Meets_Clients

When(`request all Meets registered Clients`, () => {
    Client.get_Meets_Clients().then(response => {
        cy.log("RESPONSE: " + JSON.stringify(response.body))
        cy.wrap({ response }).as("Response")
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

//get_Frontend_Clients

When(`request all Front-end registered Clients`, () => {
    Client.get_Frontend_Clients().then(response => {
        cy.log("RESPONSE: " + JSON.stringify(response.body))
        cy.wrap({ response }).as("Response")
        Response_Front = response.body
    })
});

Then(`should return the response {string} and status {int}`, (schema, status) => {
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

//get_Compare_Client

When(`compare all registered Clients on the platform with Front-end Clients`, () => {
    Response_Meets.forEach(element => {
        delete element._id
    });
    Response_Front.forEach(element => {
        delete element._id
    });
});

var clientErrorList = []
var errList = []

Then(`should validate Clients who have same name on both Endpoints`, () => {
    var nameList = []
    for (let i = 0; i < Response_Front.length; i++) {
        for (let j = 0; j < Response_Meets.length; j++) {
            if (Response_Front[i].nome === Response_Meets[j].nome) {
                nameList.push(Response_Front[i].nome)
                cy.log("Client Name: " + Response_Front[i].nome).then(() => {
                    if (JSON.stringify(Response_Front[i]) == JSON.stringify(Response_Meets[j])) {
                        expect(JSON.stringify(Response_Front[i])).to.eq(JSON.stringify(Response_Meets[j]))
                    } else {
                        for (var eachProperty in Response_Front[i]) {
                            try {
                                if (Response_Front[i][eachProperty] == "" && Response_Meets[j][eachProperty] == "") {
                                    continue
                                }
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
    clientErrorList = Response_Front.filter(e => !nameList.includes(e.nome))
});

Then(`should return Clients who have only registered name on Front-end Endpoint`, () => {
    if (clientErrorList.length == 0) {
        cy.log("There are no Clients with Errors in this section")
    } else {
        clientErrorList.forEach(element => {
            cy.log("Client Name: " + element.nome).then(() => {
                try {
                    expect(Response_Meets).to.include(JSON.stringify(element))
                } catch (err) { return }
            })
        })
    } 
});

Then(`should validate if a Client got an Error`, () => {
    if (errList.length > 0|| clientErrorList.length > 0) {
        throw new Error("An error occurred during the validation of the Clients")
    } else {
        cy.log("There are no Errors in this Test")
    }
});