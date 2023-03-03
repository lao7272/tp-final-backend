import mongoose from 'mongoose';
import MongoDBContainer from '../../containers/MongoDB.container.js';

const CartSchema = new mongoose.Schema({
    idUser: {type: String, require: true, unique: true},
    timestamp: {type: Number, require: true},
    products: [{
        name: {type: String, require: true, max: 100},
        price: {type: Number, require: true},
        urlImg: {type: String, require: true},
        description: {type: String, require: true},
        timestamp: {type: Number, require: true},
        stock: {type: Number, require: true},
        quant: {type: Number, require: true}
    }]
});
class Cart extends MongoDBContainer {
    constructor(){
        super('carts', CartSchema)
    }
}

export default Cart;