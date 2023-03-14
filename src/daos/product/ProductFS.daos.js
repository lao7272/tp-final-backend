
import Container from "../../containers/FsContainer.js";
class Product {
    constructor(){
        this.container = new Container('products.json');
    }
    async saveProduct(object){
            this.container.save(object);        
    }
    async getProductById(id){
        const productArray = await this.container.getAll() ?? [];
        const newArrayProd = productArray.find(obj => obj._id == id);
        if (!newArrayProd){
            console.log(`El id: ${id} de este producto no existe`);
        } else {
            
            const productId = await this.container.getById(id);
            console.log(productId)
            return productId;
        }
    }
    async updateProduct(id, object){
        const productArray = await this.container.getAll() ?? [];  
        const findProduct = productArray.find(prod => prod.id == object.id);
        if (findProduct) {
            this.container.update(id, object);
        } else {
            console.log('No se ha encontrado tu producto');
        }
    }
    async getAllProducts(){
        const productArray = await this.container.getAll() ?? [];  
        return productArray;
    } 
    async deleteProductById(id){
            this.container.deleteById(id); 
        }
    deleteAllProducts(){
        this.container.deleteAll();
    }
}

export default Product;

