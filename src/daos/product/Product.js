const fs = require('fs');
const Container = require('../../containers/Container');
class Product {
    constructor(timestamp, name, description, urlImg, price){
        this.name = name;
        this.timestamp = timestamp;
        this.description = description;
        this.urlImg = urlImg;
        this.price = price;
        this.container = new Container('products.json');
    }
    async saveProduct(object){
        // const productArray = await this.container.getAll() ?? [];
        // const newArrayProd = productArray.find(obj => obj.id == object.id);
        // if (newArrayProd){
        //     console.log('Ya existe el producto');
        // } else {}
            this.container.save(object);
            
        
    }
    async getProductById(id){
        const productArray = await this.container.getAll() ?? [];
        const newArrayProd = productArray.find(obj => obj.id == id);
        if (!newArrayProd){
            console.log(`El id: ${id} de este producto no existe`);
        } else {
            
            const productId = await this.container.getById(id);
            console.log(productId)
            return productId;
        }
    }
    async updateProduct(object){
        const productArray = await this.container.getAll() ?? [];  
        const findProduct = productArray.find(prod => prod.id === object.id);
        if (findProduct) {
            this.container.update(object);
        } else {
            console.log('No se ha encontrado tu producto');
        }
    }
    async getAllProducts(){
        const productArray = await this.container.getAll() ?? [];  
        console.log(productArray);
        return productArray;
    } 
    async deleteProductById(id){
        const productArray = await this.container.getAll() ?? [];  
        const findProduct = productArray.find(prod => prod.id === id);
        if (findProduct) {
            this.container.deleteById(id);
        } else {
            console.log('No se ha encontrado tu producto');
        }  
        }
    deleteAllProducts(){
        this.container.deleteAll();
    }
}

module.exports = Product;

