const mongoose = require('mongoose')
const Container = require('../../containers/MongoDBContainer');

const CartSchema = new mongoose.Schema({
    timestamp: {type: Number, require: true},
    products: [{
        name: {type: String, require: true, max: 100},
        price: {type: Number, require: true},
        urlImg: {type: String, require: true},
        description: {type: String, require: true},
        timestamp: {type: Number, require: true},
        stock: {type: Number, require: true}
    }]
});
class Cart {
    constructor(){
        this.container = new Container('carts', CartSchema);
    }
    async saveCart(object){
        this.container.save(object);
    }

    async getAllCarts(){
        const cartArray = await this.container.getAll();  
        return cartArray;
    } 
    async getCartById(id){
        const findCart= await this.container.getById(id);
        if (!findCart){
            console.log(`El id: ${id} de este producto no existe`);
            return undefined
        } else {
            
            const cartId = await this.container.getById(id);
            console.log(cartId)
            return cartId;
        }
    }
    async updateCart(id, object){
        const findCart = await this.container.getById(id);
        if (findCart) {
            this.container.update(id, object);
        } else {
            console.log('No se ha encontrado tu producto');
        }
    }
    async deleteCartById(id){
        const findCart = await this.container.getById(id);
        if (findCart) {
            this.container.deleteById(id);
        } else {
            console.log('No se ha encontrado tu carrito');
        }  
    }

    deleteAllCarts(){
        this.container.deleteAll();
    }
}

module.exports = Cart;