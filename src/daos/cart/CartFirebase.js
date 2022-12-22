const FirebaseContainer = require('../../containers/FirebaseContainer');

class Cart {
    constructor(){
        this.container = new FirebaseContainer('carts');
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