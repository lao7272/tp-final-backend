const fs = require('fs');
const Container = require('./Container');
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




// const fs = require('fs');

// class Product {
//     constructor(id, timestamp, name, description, urlImg, price){
//         this.id = id;
//         this.name = name;
//         this.timestamp = timestamp;
//         this.description = description;
//         this.urlImg = urlImg;
//         this.price = price;
//     }
//     async save(object){
//         let data;

//         try {
//             const res = await fs.promises.readFile('./products.json', 'utf-8');
//             data = JSON.parse(res)
            
            
//         } catch (error) {
//             data = undefined;
//         }

//         const arrProd = data ? data : [];
        
//         const newArrProd = arrProd.find(prod => prod.id == object.id);

//         if (newArrProd){
//             console.log('Ya existe el producto')
//         } else {
//             const newProduct = {id: arrProd.length + 1, ...object }
//             arrProd.push(newProduct);
//             fs.writeFile("./products.json", JSON.stringify(arrProd), 'utf-8', err => {
//                 if (err) {
//                     console.log(err);
//                 } else {
//                     console.log(`Producto con id: ${object.id} cargado exitosamente`);
//                 }
//             return object.id
//             });
//         }
        
//     }
//     async getById(id){
//         try {
//             const res  = await fs.promises.readFile('./products.json', 'utf8');
//             const data = JSON.parse(res);
//             const prodId = data.find(prod => prod.id === id);
//             return prodId;
//         } catch (error) {
//             return undefined;
//         }
//     }
//     async update(object){
//         let data;

//         try {
//             const res = await fs.promises.readFile('./products.json', 'utf-8');
//             data = JSON.parse(res)
            
            
//         } catch (error) {
//             data = undefined;
//         }

//         const arrProd = data ? data : [];
        
//         const productToUpdate = arrProd.findIndex(prod => prod.id === object.id);
//         arrProd.splice(productToUpdate, 1, {...object});
        
//         fs.writeFile("./products.json", JSON.stringify(arrProd), 'utf-8', (err) => {
//             if (err) {
//                 console.log(err);
//             } else {
//                 console.log(`Producto con id: ${object.id} actualizado exitosamente`);
//             }
//         return object.id
//         });
//     }
//     async getAll(){
//         try {
//             const res = await fs.promises.readFile('./products.json', 'utf-8');
//             const data = JSON.parse(res);
//             return data
            
//         } catch (error) {
//             return undefined
            
//         }
//     } 
//     async deleteById(id){
//         let data;

//         try {
//             const res = await fs.promises.readFile('./products.json', 'utf-8');
//             data = JSON.parse(res)
            
            
//         } catch (error) {
//             console.error(error)
//         }

//         let arrProd = data ? data : [];

//         const newArrProd = arrProd.find(poke => poke.id == id);
//         if(newArrProd){
//             fs.promises.readFile('./products.json', 'utf8')
//         .then(data => {
//             const arrProduct = JSON.parse(data);
//             const newProdArr = arrProduct.filter(prod => prod.id !== id);
//             arrProd = newProdArr;
//             fs.writeFile("./products.json", JSON.stringify(newProdArr), 'utf-8', err => {
//                 if (err) {
//                     console.log(err);
//                 } else {
//                     console.log(`Producto con id: ${id} eliminado`);
//                 }
//             });
//         })
//         .catch(err => console.log(err));
//         } else {
//             console.log(`EL producto con id ${id} no se ha encontrado`);
//         }
        
//         }
//     deleteAll(){
//         fs.unlink('./products.json', err => console.error(err));
//     }
// }

// module.exports = Product;
