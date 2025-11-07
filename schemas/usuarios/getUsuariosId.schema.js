const getUsuariosIdSchema = {
    ok: {
        "$schema": "http://json-schema.org/draft-07/schema#",
        "title": "Ok Schema",
        "type": "object",
        "properties": {
            "nome": {
                "type": "string"
            },
            "email": {
                "type": "string"
            },
            "password": {
                "type": "string"
            },
            "administrador": {
                "type": "string"
            },
            "_id": {
                "type": "string"
            }
        },
        "required": [
            "nome",
            "email",
            "password",
            "administrador",
            "_id"
        ]
    },
    badRequest: {
        "$schema": "http://json-schema.org/draft-07/schema#",
        "title": "Bad Request Schema",
        "type": "object",
        "propertyNames": {
            "type": "string"
        },
        "patternProperties": {
            ".*": {
                "type": "string"
            }
        },
        "minProperties": 1,
        "maxProperties": 1
    }
}

module.exports = {
    getUsuariosIdSchema
}