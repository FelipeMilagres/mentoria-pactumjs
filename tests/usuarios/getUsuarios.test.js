const { spec, expect } = require('pactum')
const { getUsuariosSchema } = require('../../schemas/usuarios/getUsuarios.schema')

describe('Teste da API - GET /usuarios', () => {

  describe('Fluxo operacional', () => {

    it('GET - /usuarios - Sucesso(200)', async () => {
      const response = await spec().get('https://serverest.dev/usuarios')

      expect(response).to.have.status(200)
      expect(response).to.have.bodyContains("quantidade")
      expect(response).to.have.bodyContains("usuarios")
      expect(response).to.have.jsonSchema(getUsuariosSchema.ok)
      expect(response).to.have.responseTimeLessThan(1000)
    })
  })
})