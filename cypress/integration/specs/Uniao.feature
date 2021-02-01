# language: pt
Funcionalidade: Uniao

    @Email
    Cenario: Validar email
        Quando o email for cadastrado mais de uma vez
        Entao deve ser direcionado ao endpoint '/validacao/uniao'
        E retornar a resposta 'email' com status 200