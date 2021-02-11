import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'
import Union from "../../services/union.service.js"
import Client from "../../services/client.service.js"

var testeArr = []

//post_Union

When(`compare Clients and get the ones with repeated names`, () => {
    Client.get_Meets_Clients().then(response => {
        response = response.body
        for (let i = 0; i < response.length; i++) {
            for (var eachProperty in response[i]) {
                if (eachProperty === "nome" || eachProperty === "email") {
                    continue
                } else {
                    delete response[i][eachProperty]
                }
            }            
        }
        var nameArr = response.map(item => item.nome)
        var duplicatesArr = nameArr.filter((item, idx) => nameArr.indexOf(item) != idx)
        testeArr = response.filter(e => duplicatesArr.includes(e.nome))
        if (testeArr.length === 0) {
            cy.log("There are no Clients with repeated names!")
        } else {
            cy.log("Clients with repeated names: " + JSON.stringify(testeArr))
        }
    })
});

Then(`save those Clients on Union and return the response {string} status {int}`, (schema, status) => {
    if (testeArr.length === 0) {
        return true
    } else {
        testeArr.forEach(e => {
            Union.post_Union(e).then(response => {
                cy.log("RESPONSE: " + JSON.stringify(response.body))
                cy.log(cy.validateSchema(response.body, `${schema}/${status}`))
                expect(response.status).to.equal(status)
            })
        });
    }
});