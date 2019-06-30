# Adonis Cake Api Application

## Setup
- Copy paste Commands
- Enter the folder start/app.js and paste the next command:
```
const commands = [
  'App/Commands/CakeCrud',
  'App/Commands/CakeTest',
  'App/Commands/CakeDocumentation'
];
```
- Create cake.js in paste root in the following structure example:
````
[
  {
    "name": "Users",
    "hidden": ["id"],
    "fields": {
      "id": {
        "column": { "type": "increments" },
        "unique": true,
        "nullable": true
      },
      "uuid": {
        "column": { "type": "uuid" },
        "unique": true,
        "notNullable": true,
        "unsigned": true
      },
      "title": {
        "column": { "type": "string" },
        "unique": true,
        "nullable": true
      },
      "description": {
        "column": { "type": "string" },
        "unique": true,
        "nullable": true
      },
      "created_by": {
        "column": { "type": "uuid" },
        "references": "uuid",
        "inTable": "users",
        "notNullable": true,
        "onDelete": "CASCADE",
        "relationship": "belongsTo"
      },
      "created_at": {
        "column": { "type": "timestamps" }
      },
      "updated_at": {
        "column": { "type": "timestamps" }
      }
    },

    "validations": {
      "rules": {
        "document_number": "required|min:11|max:11",
        "status": "required"
      },
      "messsage": {
        "document_number.required": "O Documento é obrigatório",
        "status.required": "O status é obrigatório"
      }
    },
    "routes": {
      "index": ["auth"],
      "show": [],
      "store": [],
      "update": [],
      "destroy": []
    }
  }
]

```
