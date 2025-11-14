const { spec, expect, stash } = require("pactum")
const fakerData = require("../../helpers/fakerData.helper")
const { describe } = require("mocha")
const { urls } = require("../../data/urls.data")
const { putUsuariosIdSchema } = require("../../schemas/usuarios/putUsuariosId.schema")

describe('Teste da API - PUT /usuarios/{_ID}', () => {

    let randomUser, createdUser, randomUserId, response

    beforeEach('Gera um novo usuário randômico', async () => {
        randomUser = fakerData.createRandomUser()
        createdUser = await spec().post(urls.usuarios).withBody(randomUser)
        randomUserId = createdUser.body._id
    })

    describe('Fluxo operacional', () => {
        it('PUT - /usuarios/{_ID} - Edição com Sucesso(200)', async () => {
            randomUser.email = fakerData.createRandomEmail()
            response = await spec().put(`${urls.usuarios}/${randomUserId}`).withBody(randomUser)
            expect(response).to.have.status(200)
            expect(response).to.have.jsonLike({
                message: "Registro alterado com sucesso"
            })
            expect(response).to.have.jsonSchema(putUsuariosIdSchema.ok)
            expect(response).to.have.responseTimeLessThan(1000)
        })

        it('PUT - /usuarios/{_ID} - Cadastro com Sucesso(201)', async () => {
            randomUser = fakerData.createRandomUser()
            response = await spec().put(`${urls.usuarios}/qASo4mfosnglrtds`).withBody(randomUser)
            expect(response).to.have.status(201)
            expect(response).to.have.jsonLike({
                message: "Cadastro realizado com sucesso",
                _id: /^[a-zA-Z0-9]{16}$/
            })
            expect(response).to.have.jsonSchema(putUsuariosIdSchema.created)
            expect(response).to.have.responseTimeLessThan(1000)
        })
    })

    describe('Cobertura de exceções', () => {
        it('PUT - /usuarios/{_ID} - E-mail cadastrado (400)', async () => {
            let randomUserTwo = fakerData.createRandomUser()
            await spec().post(urls.usuarios).withBody(randomUserTwo)
            let randomUserEmail = randomUserTwo.email
            randomUser.email = randomUserEmail
            response = await spec().put(`${urls.usuarios}/${randomUserId}`).withBody(randomUser)

            expect(response).to.have.status(400)
            expect(response).to.have.jsonLike({
                message: "Este email já está sendo usado"
            })
            expect(response).to.have.jsonSchema(putUsuariosIdSchema.badRequest)
            expect(response).to.have.responseTimeLessThan(1000)
        })

        it('PUT - /usuarios/{_ID} - Nome em branco (400)', async () => {
            randomUser.nome = ""
            response = await spec().put(`${urls.usuarios}/${randomUserId}`).withBody(randomUser)
            expect(response).to.have.status(400)
            expect(response).to.have.jsonLike({
                nome: "nome não pode ficar em branco"
            })
            expect(response).to.have.jsonSchema(putUsuariosIdSchema.badRequest)
            expect(response).to.have.responseTimeLessThan(1000)
        })

        it('PUT - /usuarios/{_ID} - Nome obrigatório (400)', async () => {
            delete randomUser.nome
            response = await spec().put(`${urls.usuarios}/${randomUserId}`).withBody(randomUser)
            expect(response).to.have.status(400)
            expect(response).to.have.jsonLike({
                nome: "nome é obrigatório"
            })
            expect(response).to.have.jsonSchema(putUsuariosIdSchema.badRequest)
            expect(response).to.have.responseTimeLessThan(1000)
        })

        it('PUT - /usuarios/{_ID} - Nome tipo (400)', async () => {
            randomUser.nome = true
            response = await spec().put(`${urls.usuarios}/${randomUserId}`).withBody(randomUser)
            expect(response).to.have.status(400)
            expect(response).to.have.jsonLike({
                nome: "nome deve ser uma string"
            })
            expect(response).to.have.jsonSchema(putUsuariosIdSchema.badRequest)
            expect(response).to.have.responseTimeLessThan(1000)
        })

        it('PUT - /usuarios/{_ID} - Email em branco (400)', async () => {
            randomUser.email = ""
            response = await spec().put(`${urls.usuarios}/${randomUserId}`).withBody(randomUser)
            expect(response).to.have.status(400)
            expect(response).to.have.jsonLike({
                email: "email não pode ficar em branco"
            })
            expect(response).to.have.jsonSchema(putUsuariosIdSchema.badRequest)
            expect(response).to.have.responseTimeLessThan(1000)
        })

        it('PUT - /usuarios/{_ID} - Password em branco (400)', async () => {
            randomUser.password = ""
            response = await spec().put(`${urls.usuarios}/${randomUserId}`).withBody(randomUser)
            expect(response).to.have.status(400)
            expect(response).to.have.jsonLike({
                password: "password não pode ficar em branco"
            })
            expect(response).to.have.jsonSchema(putUsuariosIdSchema.badRequest)
            expect(response).to.have.responseTimeLessThan(1000)
        })

        it('PUT - /usuarios/{_ID} - Administrador em branco (400)', async () => {
            randomUser.administrador = ""
            response = await spec().put(`${urls.usuarios}/${randomUserId}`).withBody(randomUser)
            expect(response).to.have.status(400)
            expect(response).to.have.jsonLike({
                administrador: "administrador deve ser 'true' ou 'false'"
            })
            expect(response).to.have.jsonSchema(putUsuariosIdSchema.badRequest)
            expect(response).to.have.responseTimeLessThan(1000)
        })
    })
})