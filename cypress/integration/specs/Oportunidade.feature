# language: pt
Funcionalidade: Oportunidade

    @Oportunidade
    Cenario: Validar oportunidade
        Quando a oportunidade for comparada com a oportunidade da api 
        Entao deve retornar a resposta 'schema_name' com status 200
        E retornar a oportunidade correta

    @OportunidadeEx
    Cenario: Validar oportunidade (Exception)
        Quando a oportunidade for comparada com a oportunidade da api 
        Entao deve retornar a resposta 'schema_name' com status 400