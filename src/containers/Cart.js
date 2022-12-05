const fs = require('fs');
const Container = require('./Container');
class Cart {
    constructor(timestamp, name, description, urlImg, price){
        this.name = name;
        this.timestamp = timestamp;
        this.description = description;
        this.urlImg = urlImg;
        this.price = price;
        this.container = new Container('carts.json');
    }
    async saveCart(object){
        this.container.save(object);
    }
    async getCartById(id){
        const cartArray = await this.container.getAll() ?? [];
        const newCartArray = cartArray.find(obj => obj.id === id);
        if (!newCartArray){
            console.log(`El id: ${id} de este producto no existe`);
            return undefined
        } else {
            
            const cartId = await this.container.getById(id);
            console.log(cartId)
            return cartId;
        }
    }
    async updateCart(object){
        const cartArray = await this.container.getAll() ?? [];  
        const findCart = cartArray.find(cart => cart.id === object.id);
        if (findCart) {
            this.container.update(object);
        } else {
            console.log('No se ha encontrado tu producto');
        }
    }
    async getAllCarts(){
        const cartArray = await this.container.getAll() ?? [];  
        console.log(cartArray);
        return cartArray;
    } 
    async deleteCartById(id){
        const cartArray = await this.container.getAll() ?? [];  
        const findCart = cartArray.find(cart => cart.id === id);
        if (findCart) {
            this.container.deleteById(id);
        } else {
            console.log('No se ha encontrado tu carrito');
        }  
        }
    async deleteProductById(idCart, idProduct){
        const cartArray = await this.container.getAll() ?? [];  
        
        let findCart = cartArray.find(cart => cart.id === idCart);
        const newProductArr = findCart.products.filter(product => product.id !== idProduct);
        if(newProductArr.length !== 0){
            findCart.products = newProductArr;
            
            console.log(cartArray)
            this.container.update(findCart);
        } else {
            console.log("No hay productos para eliminar")
        }
    } 
    deleteAllCarts(){
        this.container.deleteAll();
    }
}

module.exports = Cart;