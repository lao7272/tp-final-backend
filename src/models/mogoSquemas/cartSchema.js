import mongoose from "mongoose";
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
export default CartSchema;