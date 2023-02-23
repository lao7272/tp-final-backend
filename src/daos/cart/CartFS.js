import Container from "../../containers/FsContainer.js";
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
    const cartId = await this.container.getById(id);
    return cartId;

    }
    async updateCart(id, object){
        this.container.update(id, object);
    }
    async getAllCarts(){
        const cartArray = await this.container.getAll() ?? [];  
        console.log(cartArray);
        return cartArray;
    } 
    async deleteCartById(id){
            this.container.deleteById(id); 
        }
    deleteAllCarts(){
        this.container.deleteAll();
    }
}

export default Cart;