import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'
import Union from "../../services/union.service.js"
import Client from "../../services/client.service.js"

var testeArr

//post_Union
When(`compare Clients to get those with repeated Names`, () => {
    Client.get_Meets_Clients().then(response => {
        response = response.body
        var nameArr = response.map(item => item.nome) //Apenas os Nomes
        var duplicatesArr = nameArr.filter((item, idx) => nameArr.indexOf(item) != idx) //Apenas os Nomes Duplicados
        testeArr = response.filter(e => duplicatesArr.includes(e.nome)) //Forma a Array
        if (testeArr.length === 0) {
            cy.log("Não há Clientes nomes repetidos!")
        }
    })
});

Then(`save those Clients on Union with response status {int}`, (status) => {
    if (testeArr.length === 0) {
        return true
    } else {
        testeArr.forEach(e => {
            Union.post_Union(e).then(response => {
                cy.log("RESPONSE: " + JSON.stringify(response.body))
                expect(response.status).to.equal(status)
            })
        });
    }
});