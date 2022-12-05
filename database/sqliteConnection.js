const sqliteConnection = {
    client: 'sqlite3', 
    connection: {
    filename: "./ecommerce.sqlite"
    }
};
module.exports = sqliteConnection;
//npm run create-database