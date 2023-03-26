import mongoose from "mongoose";
import { logger } from "../modules/logger/logger.js";

class MongoDBContainer {
    constructor(collectionName, schema){
        this.collection = mongoose.model(collectionName, schema);
    }

    async CRUD () {
        try {
            const URL = 'mongodb://127.0.0.1:27017/ecommerce'
            mongoose.connect(URL, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                serverSelectionTimeoutMS: 5000
            });
            console.log("MONGO DB conectado");
        } catch (err) {
            logger.error(`MongoDB error: ${err}`);
        }
    }
    
    /* CREATE */

    async save(object){
        this.CRUD();
        try {
            const objectSaved = await this.collection.create(object);
            return objectSaved;
        } catch (err) {
            logger.error(`MongoDB error: ${err}`);
        }
    }

    /* UPDATE */

    async update(id, object){
        this.CRUD();
        try {
            await this.collection.updateOne({_id: id}, {$set: object});
        } catch (err) {
            logger.error(`MongoDB error: ${err}`);
        }
    }

    /* READ */

    async getAll(){
        this.CRUD();
        try {
            const data = await this.collection.find({});
            return data;
        } catch (err) {
            logger.error(`MongoDB error: ${err}`);
        }
    }
    async getById(id){
        this.CRUD();
        try {
            const findId = await this.collection.findOne({_id: id }); 
            return findId;
        } catch (err) {
            logger.error(`MongoDB error: ${err}`);
        }
        }

    /* DELETE */
    async deleteById(id){
        this.CRUD();
        try {
            const deleteById = await this.collection.deleteOne({_id: id }); 
            return deleteById;
        } catch (err) {
            logger.error(`MongoDB error: ${err}`);
        }
    }
    async deleteAll(){
        this.CRUD();
        try {
            await this.collection.deleteMany({}); 
        } catch (err) {
            logger.error(`MongoDB error: ${err}`);
        }
    }
    
}

export default MongoDBContainer;
