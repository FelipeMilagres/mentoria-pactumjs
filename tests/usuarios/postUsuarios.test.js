const { spec, expect, stash } = require("pactum")
const { postUsuariosSchema } = require("../../schemas/usuarios/postUsuarios.schema")
const fakerData = require("../../helpers/fakerData.helper")
const { describe } = require("mocha")

describe('Teste da API - POST /usuarios', () => {

    const body = fakerData.createRandomUser()
    let randomUser

    beforeEach('Gera um novo usuário randômico', () => {
        randomUser = fakerData.createRandomUser()
    })

    describe('Fluxo operacional', () => {
        it('POST - /usuarios - Sucesso(201)', async () => {

            const response = await spec().post('https://serverest.dev/usuarios').withBody(body)

            expect(response).to.have.status(201)
            expect(response).to.have.jsonLike({
                message: "Cadastro realizado com sucesso",
                _id: /^[a-zA-Z0-9]{16}$/
            })
            expect(response).to.have.jsonSchema(postUsuariosSchema.created)
            expect(response).to.have.responseTimeLessThan(1000)
        })
    })

    describe('Cobertura de exceções', () => {
        it('POST - /usuarios - Email já cadastrado (400)', async () => {
            const response = await spec().post('https://serverest.dev/usuarios').withBody(body)
            expect(response).to.have.status(400)
            expect(response).to.have.jsonLike({
                message: "Este email já está sendo usado"
            })
            expect(response).to.have.jsonSchema(postUsuariosSchema.badRequest.registeredEmail)
            expect(response).to.have.responseTimeLessThan(1000)
        })

        it('POST - /usuarios - Nome em branco (400)', async () => {
            randomUser.nome = ""

            const response = await spec().post('https://serverest.dev/usuarios').withBody(randomUser)
            expect(response).to.have.status(400)
            expect(response).to.have.jsonLike({
                nome: "nome não pode ficar em branco"
            })
            expect(response).to.have.jsonSchema(postUsuariosSchema.badRequest.name)
            expect(response).to.have.responseTimeLessThan(1000)
        })

        it('POST - /usuarios - Nome obrigatório (400)', async () => {
            delete randomUser.nome

            const response = await spec().post('https://serverest.dev/usuarios').withBody(randomUser)
            expect(response).to.have.status(400)
            expect(response).to.have.jsonLike({
                nome: "nome é obrigatório"
            })
            expect(response).to.have.jsonSchema(postUsuariosSchema.badRequest.name)
            expect(response).to.have.responseTimeLessThan(1000)
        })
    })
})