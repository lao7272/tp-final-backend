import MongoDBContainer from '../../containers/MongoDBContainer.js';
import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
    name: {type: String, require: true, max: 100},
    price: {type: Number, require: true},
    urlImg: {type: String, require: true},
    description: {type: String, require: true},
    timestamp: {type: Number, require: true},
    stock: {type: Number, require: true}
});
class Product extends MongoDBContainer {
    constructor(){
        super('products', ProductSchema)
    }
}
export default Product;
