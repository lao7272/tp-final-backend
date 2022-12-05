const fs = require('fs');

class ProductContainer {
    constructor(id, name, brand, price){
        this.id = id;
        this.name = name;
        this.brand = brand;
        this.price = price
    }
    async save(object){
        let data;

        try {
            const res = await fs.promises.readFile('./products.json', 'utf-8');
            data = JSON.parse(res)
            
            
        } catch (error) {
            console.error(error)
        }

        const arrProd = data ? data : [];
        
        const newArrProd = arrProd.find(prod => prod.id == object.id);

        if (newArrProd){
            console.log('Ya existe el producto')
        } else {
            const newProduct = {id: arrProd.length + 1, ...object }
            arrProd.push(newProduct);
            fs.writeFile("./products.json", JSON.stringify(arrProd), 'utf-8', err => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(`Producto con id: ${object.id} cargado exitosamente`);
                }
            return object.id
            });
        }
        
    }
    getById(id){
        fs.promises.readFile('./products.json', 'utf8')
    .then(data => {
        const arrProduct = JSON.parse(data);
        const prodId = arrProduct.find(prod => prod.id === id);
        console.log(prodId)
    })
    .catch(err => console.log(err));
    }
    async getAll(){
        try {
            const res = await fs.promises.readFile('./products.json', 'utf-8');
            const data = JSON.parse(res);
            return data
            
        } catch (error) {
            return undefined
        }
    } 
    async deleteById(id){
        let data;

        try {
            const res = await fs.promises.readFile('./products.json', 'utf-8');
            data = JSON.parse(res)
            
            
        } catch (error) {
            console.error(error)
        }

        let arrProd = data ? data : [];

        const newArrProd = arrProd.find(poke => poke.id == id);
        if(newArrProd){
            fs.promises.readFile('./products.json', 'utf8')
        .then(data => {
            const arrProduct = JSON.parse(data);
            const newProdArr = arrProduct.filter(prod => prod.id !== id);
            arrProd = newProdArr;
            fs.writeFile("./products.json", JSON.stringify(newProdArr), 'utf-8', err => {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Producto eliminado');
                }
            });
        })
        .catch(err => console.log(err));
        } else {
            console.log(`EL producto con id ${id} ha sido eliminado`)
        }
        
        }
    deleteAll(){
        fs.unlink('./products.json', err => console.error(err));
    }
}

module.exports = ProductContainer;

