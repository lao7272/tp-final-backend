const knex = require('knex');

class SqlContainer {
    constructor(config, table){
        this.database = knex(config);
        this.table = table;
    }
    async save(object){
        const id = await this.database(this.table).insert(object, ['id'])
        return id;
    }
    async getById(idObject){
        const id = await this.database.select().from(`${this.table}`).where("id", idObject);
        return id;
    }
    async getAll(){
        try {
            
            const db = await this.database.from(`${this.table}`).select("*");
            console.log('db', db)
            return db;
        } catch (error) {
            console.error(error)
        }
    } 
    async update(id, object) {
        this.database.from(`${this.table}`)
        .where('id', id)
        .update(object);
    }
    async deleteById(id){
        await this.database(this.table).where('id', id).del();        
        }
    async deleteAll(){
        await this.database(this.table).del(); 
    }
}

module.exports = SqlContainer;

