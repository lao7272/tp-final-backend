const knex = require('knex');
const mysqlConnection = require("./mysqlConnection");
const sqliteConnection = require('./sqliteConnection')

const createProductTable = async () => {
    try {
        const database = knex(mysqlConnection);

        await database.schema.dropTableIfExists('products');
        await database.schema.createTable('products', (table) => {
            table.increments('id').primary();
            table.string('name', 255).notNullable();
            table.string('imgUrl', 255).notNullable();
            table.float('price').notNullable();
        });
        console.log('Table products creada');
    } catch (error) {
        console.error('Table products no creada');
    }

}

const createMessageTable = async () => {
    try {
        const database = knex(sqliteConnection);
        
        await database.schema.dropTableIfExists('products');
        await database.schema.createTable('products', (table) => {
            table.increments('id').primary();
            table.string('author', 255).notNullable();
            table.string('text', 255).notNullable();
            table.timestamps('dateMessage');
        });

        console.log('Table messages creada');
    } catch (error) {
        console.error('Table messages no creada', error);
    }
}

const createTable = async () => {
    // await createProductTable();
    await createMessageTable();
}
createTable();

