import MongoDBContainer from '../../containers/MongoDB.container.js';
import ProductSchema from '../../models/mogoSquemas/productSchema.js';
class Product extends MongoDBContainer {
    constructor(){
        super('products', ProductSchema);
    }
}
export default Product;
