const postUsuariosSchema = {
    created: {
        "$schema": "http://json-schema.org/draft-07/schema#",
        "title": "Created Schema",
        "type": "object",
        "properties": {
            "message": {
                "type": "string"
            },
            "_id": {
                "type": "string"
            }
        },
        "required": [
            "message",
            "_id"
        ]
    },
    badRequest: {
        registeredEmail: {
            "$schema": "http://json-schema.org/draft-07/schema#",
            "title": "Bad Request Schema",
            "type": "object",
            "properties": {
                "message": {
                    "type": "string"
                }
            },
            "required": [
                "message"
            ]
        },
        name: {
            "$schema": "http://json-schema.org/draft-07/schema#",
            "title": "Generated schema for Root",
            "type": "object",
            "properties": {
                "nome": {
                    "type": "string"
                }
            },
            "required": [
                "nome"
            ]
        }
    }
}

module.exports = {
    postUsuariosSchema
}


