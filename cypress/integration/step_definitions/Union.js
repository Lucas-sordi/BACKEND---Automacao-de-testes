import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'
import Union from "../../services/union.service.js"
import Client from "../../services/client.service.js"

var testeArr

//post_Union
When(`compare Clients to get those with repeated Emails`, () => {
    Client.get_Meets_Clients().then(response => {
        response = response.body
        var emailArr = response.map(item => item.email)
        var duplicatesArr = emailArr.filter((item, idx) => emailArr.indexOf(item) != idx)
        testeArr = response.filter(e => duplicatesArr.includes(e.email))
    })
});

Then(`save those Clients on Union with response status {int}`, (status) => {
    testeArr.forEach(e => {
        Union.post_Union(e).then(response => {
            cy.log("RESPONSE: " + JSON.stringify(response.body))
            expect(response.status).to.equal(status)
        })
    });
});