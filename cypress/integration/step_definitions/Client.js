import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'
import Client from "../../services/client.service.js"

var Response_Meets, Response_Front

//get_Meets_Clients

When(`request all Meets registered Clients`, () => {
	Client.get_Meets_Clients().then(response => {
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

//get_Frontend_Clients

When(`request all Front-end registered Clients`, () => {
	Client.get_Frontend_Clients().then(response => {
        cy.log("RESPONSE: " + JSON.stringify(response.body))
        cy.wrap({response}).as("Response")        
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

//Variaveis Globais
var errorList = []
var clientErrorList = []

When(`request to compare the registered Clients`, () => {
    //Remover Propriedade ._ID
    Response_Meets.forEach(element => {
        delete element._id
    });
    Response_Front.forEach(element => {
        delete element._id
    });    
    //Remover Clientes Duplicados
    const uniqueClientsMeets = Array.from(new Set(Response_Meets.map(e => e.nome))).map(nome => {
        return Response_Meets.find(e => e.nome === nome)
    })
    const uniqueClientsFront = Array.from(new Set(Response_Front.map(e => e.nome))).map(nome => {
        return Response_Front.find(e => e.nome === nome)
    })
    //Criacao das Listas
    var nameList = uniqueClientsMeets.map(e => e.nome)
    var filterList = uniqueClientsFront.filter(e => nameList.includes(e.nome))
    //Teste de Validacao
    for (let index = 0; index < filterList.length; index++) {
        if (JSON.stringify(filterList[index]) !== JSON.stringify(uniqueClientsMeets[index])) {
            errorList.push(nameList[index])
        }        
    }
    //Lista dos Clientes com Erros (Objetos)
    clientErrorList = filterList.filter(e => errorList.includes(e.nome))
    clientErrorList.push(Response_Front.filter(e => !nameList.includes(e.nome)))
});

Then(`should return the correct data`, () => {
    if (errorList.length > 0) {
        cy.log("Clientes com Erro: " + JSON.stringify(clientErrorList))
    } else {
        cy.log("Todos os Clientes passaram")
    }
});