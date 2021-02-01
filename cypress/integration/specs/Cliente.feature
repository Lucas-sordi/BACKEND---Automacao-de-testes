# language: pt
Funcionalidade: Cliente

    @Cliente
    Cenario: Validar cliente
        Quando comparar o cliente com o cliente da api 
        Entao deve retornar a resposta 'schema_name' com status 200
        E retornar o cliente correto

    @ClienteEx
    Cenario: Validar cliente (Exception)
        Quando comparar o cliente com o cliente da api 
        Entao deve retornar a resposta 'schema_name' com status 400
