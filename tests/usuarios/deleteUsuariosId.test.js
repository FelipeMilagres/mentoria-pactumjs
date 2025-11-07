const { spec, expect } = require("pactum")
const { postUsuariosSchema } = require("../../schemas/usuarios/postUsuarios.schema")
const fakerData = require("../../helpers/fakerData.helper")
const { describe } = require("mocha")
const { urls } = require("../../data/urls.data")
const { deleteUsuariosIdSchema } = require("../../schemas/usuarios/deleteUsuariosId.schema")

describe('Teste da API - DELETE /usuarios/{_ID}', () => {

    let randomUser, createdUser, response

    beforeEach('Gera um novo usuário randômico', async () => {
        randomUser = fakerData.createRandomUser()
        createdUser = await spec().post(urls.usuarios).withBody(randomUser)
        randomUser._id = createdUser.body._id
    })

    describe('Fluxo operacional', () => {
        it('DELETE - /usuarios/{_ID} - Sucesso(200)', async () => {
            response = await spec().delete(`${urls.usuarios}/${createdUser.body._id}`)
            expect(response).to.have.status(200)
            expect(response).to.have.jsonLike({ message: "Registro excluído com sucesso" })
            expect(response).to.have.jsonSchema(deleteUsuariosIdSchema.ok)
            expect(response).to.have.responseTimeLessThan(1000)
        })
    })

    describe('Cobertura de exceções', () => {
        it('DELETE - /usuarios/{_ID} - Usuário não encontrado(200)', async () => {
            response = await spec().delete(`${urls.usuarios}/asdfghjklqwertyu`)
            expect(response).to.have.status(200)
            expect(response).to.have.jsonLike({ message: "Nenhum registro excluído" })
            expect(response).to.have.jsonSchema(deleteUsuariosIdSchema.ok)
            expect(response).to.have.responseTimeLessThan(1000)
        })

        it('DELETE - /usuarios/{_ID} - Usuário com carrinho (400)', async () => {
            response = await spec().delete(`${urls.usuarios}/0uxuPY0cbmQhpEz1`)
            expect(response).to.have.status(400)
            expect(response).to.have.jsonLike({
                message: "Não é permitido excluir usuário com carrinho cadastrado",
                idCarrinho: "qbMqntef4iTOwWfg"
            })
            expect(response).to.have.jsonSchema(deleteUsuariosIdSchema.badRequest)
            expect(response).to.have.responseTimeLessThan(1000)
        })
    })
})