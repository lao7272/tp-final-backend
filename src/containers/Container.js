const fs = require('fs');

class Container {
    constructor(fileName){
        this.fileName = fileName;
    }
    async save(object){
        let data;
        try {
            const res = await fs.promises.readFile(`./${this.fileName}`, 'utf-8');
            data = JSON.parse(res);            
        } catch (error) {
            data = undefined;
        }

        const containerArray = data ? data : [];
        
        const newArrProd = containerArray.find(obj => obj.id == object.id);
        const id = Math.floor(Math.random() * 999999);
        if (newArrProd){
            console.log('Ya existe el producto');
        } else {
            const newProduct = {id: id, ...object }
            containerArray.push(newProduct);
            fs.writeFile(`./${this.fileName}`, JSON.stringify(containerArray), 'utf-8', err => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(`Producto con id: ${object.id} cargado exitosamente`);
                }
            return object.id
            });
        }
        
    }
    async getById(id){
        try {
            const res = await fs.promises.readFile(`./${this.fileName}`, 'utf-8');
            const data = JSON.parse(res);
            const objectId = data.find(obj => obj.id === id);
            return objectId;
        } catch (error) {
            return undefined;
        }
    }
    async update(object){
        let data;

        try {
            const res = await fs.promises.readFile(`./${this.fileName}`, 'utf-8');
            data = JSON.parse(res)
            
            
        } catch (error) {
            data = undefined;
        }

        const containerArray = data ? data : [];
        
        const findObj = containerArray.find(obj => obj.id == object.id);
        if(findObj){ 
            const objectToUpdate = containerArray.findIndex(obj => obj.id === object.id);
            containerArray.splice(objectToUpdate, 1, {...object});
            fs.writeFile(`./${this.fileName}`, JSON.stringify(containerArray), 'utf-8', (err) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(`Elemento con id: ${object.id} actualizado exitosamente`);
                }
            return object.id
            });
        } else {
            console.log(`Elemento con id: ${object.id} no se ha encontrado`);
        }
        
    }
    async getAll(){
        try {
            const res = await fs.promises.readFile(`./${this.fileName}`, 'utf-8');
            const data = JSON.parse(res);
            return data
            
        } catch (error) {
            return undefined
            
        }
    } 
    async deleteById(id){
        let data;
        try {
            const res = await fs.promises.readFile(`./${this.fileName}`, 'utf-8');
            data = JSON.parse(res);            
        } catch (error) {
            console.error(error)
        }

        let containerArray = data ? data : [];

        const findObj = containerArray.find(obj => obj.id == id);
        if(findObj){            
            const newContainerArray = containerArray.filter(obj => obj.id !== id);
            console.log(newContainerArray)
            fs.writeFile(`./${this.fileName}`, JSON.stringify(newContainerArray), 'utf-8', err => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(`Elemento con id: ${id} eliminado`);
                }
            });
        } else {
            console.log(`Elemento con id: ${id} no se ha encontrado`);
        }
        
        }
    deleteAll(){
        fs.unlink('./products.json', err => console.error(err));
    }
}

module.exports = Container;