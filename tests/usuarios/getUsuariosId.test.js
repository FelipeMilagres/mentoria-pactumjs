const { spec, expect } = require("pactum")
const { postUsuariosSchema } = require("../../schemas/usuarios/postUsuarios.schema")
const fakerData = require("../../helpers/fakerData.helper")
const { describe } = require("mocha")
const { urls } = require("../../data/urls.data")
const { getUsuariosIdSchema } = require("../../schemas/usuarios/getUsuariosId.schema")

describe('Teste da API - GET /usuarios/{_ID}', () => {

    let randomUser, createdUser, response

    beforeEach('Gera um novo usuário randômico', async () => {
        randomUser = fakerData.createRandomUser()
        createdUser = await spec().post(urls.usuarios).withBody(randomUser)
        randomUser._id = createdUser.body._id
    })

    describe('Fluxo operacional', () => {
        it('GET - /usuarios/{_ID} - Sucesso(200)', async () => {
            response = await spec().get(`${urls.usuarios}/${createdUser.body._id}`)
            expect(response).to.have.status(200)
            expect(response).to.have.jsonLike(randomUser)
            expect(response).to.have.jsonSchema(getUsuariosIdSchema.ok)
            expect(response).to.have.responseTimeLessThan(1000)
        })
    })

    describe('Cobertura de exceções', () => {
        it('GET - /usuarios/{_ID} - Usuário não encontrado(400)', async () => {
            response = await spec().get(`${urls.usuarios}/asdfghjklqwertys`)
            expect(response).to.have.status(400)
            expect(response).to.have.jsonLike({ message: 'Usuário não encontrado' })
            expect(response).to.have.jsonSchema(getUsuariosIdSchema.badRequest)
            expect(response).to.have.responseTimeLessThan(1000)
        })

        it('GET - /usuarios/{_ID} - Tamanho id (400)', async () => {
            response = await spec().get(`${urls.usuarios}/asdfghjklqwerty`)
            expect(response).to.have.status(400)
            expect(response).to.have.jsonLike({ id: 'id deve ter exatamente 16 caracteres alfanuméricos' })
            expect(response).to.have.jsonSchema(getUsuariosIdSchema.badRequest)
            expect(response).to.have.responseTimeLessThan(1000)
        })
    })
})