import MongoDBContainer from '../../containers/MongoDB.container.js';
import CartSchema from '../../models/mogoSquemas/cartSchema.js';

class Cart extends MongoDBContainer {
    constructor(){
        super('carts', CartSchema)
    }
}

export default Cart;