const fs = require('fs');

class Container {
    constructor(fileName){
        this.fileName = fileName;
    }
    async save(object){
        
        const data = await this.getAll();
        const containerArray = data ? data : [];
        
        const newArrProd = containerArray.find(obj => obj._id == object._id);
        const id = containerArray.length + 1;
        if (newArrProd){
            console.log('Ya existe el producto');
        } else {
            const newProduct = {_id: id, ...object }
            containerArray.push(newProduct);
            fs.writeFile(`./${this.fileName}`, JSON.stringify(containerArray), 'utf-8', err => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(`Producto con id: ${object.id} cargado exitosamente`);
                }
            return object
            });
        }
        
    }
    async getById(id){
        const data = await this.getAll();
        const objectId = data.find(obj => obj._id == id);
        return objectId;
    }
    async update(id, object){
        const data = await this.getAll();

        const containerArray = data ? data : [];
        
        const findObj = containerArray.find(obj => obj._id == id);
        if(findObj){ 
            const objectToUpdate = containerArray.findIndex(obj => obj._id == id);
            console.log(objectToUpdate)
            const newObject = {_id: parseInt(id), ...findObj, ...object}
            containerArray.splice(objectToUpdate, 1, newObject);
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
        const data = await this.getAll();
        let containerArray = data ? data : [];

        const findObj = containerArray.find(obj => obj._id == id);
        if(findObj){            
            const newContainerArray = containerArray.filter(obj => obj._id != id);
            
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