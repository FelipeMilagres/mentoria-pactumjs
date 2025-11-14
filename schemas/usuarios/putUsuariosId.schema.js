const putUsuariosIdSchema = {
    ok: {
        "$schema": "http://json-schema.org/draft-07/schema#",
        "title": "Ok schema",
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
    putUsuariosIdSchema
}