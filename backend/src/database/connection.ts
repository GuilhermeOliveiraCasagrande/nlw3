//Conecta com o db
import { createConnection } from "typeorm"

createConnection({
    "type":"sqlite",
    "database":"./src/database/database.sqlite",
    "migrations":[
        "./src/database/migrations/*.ts"
    ],
    "cli":{
        "migrationsDir":"./src/database/migrations/"
    },
    "entities":[
        "./src/models/*.ts"
    ]
});