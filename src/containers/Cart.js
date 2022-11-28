const fs = require('fs');

class Cart {


    async save(object){
        let data;

        try {
            const res = await fs.promises.readFile('./cart.json', 'utf-8');
            data = JSON.parse(res)
            
            
        } catch (error) {
            data = undefined;
        }

        const cartArr = data ? data : [];

        
        const indexCart = cartArr.find(prod => prod.id == object.id);

        if (indexCart){
            console.log('Ya existe el producto')
        } else {
            const newCart = {id: cartArr.length + 1, ...object }
            cartArr.push(newCart);
            fs.writeFile("./cart.json", JSON.stringify(cartArr), 'utf-8', err => {
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
        const res = await fs.promises.readFile('./cart.json', 'utf-8');
        const data = JSON.parse(res);
        const cartId = data.find(cart => cart.id === id);
        return cartId;
        
    } catch (error) {
        return undefined;
    }
    }


    async update(object){
        let data;

        try {
            const res = await fs.promises.readFile('./cart.json', 'utf-8');
            data = JSON.parse(res)
            
            
        } catch (error) {
            data = undefined;
        }

        const cartArr = data ? data : [];
        
        const productToUpdate = cartArr.findIndex(cart => cart.id === object.id);
        cartArr.splice(productToUpdate, 1, object);
        
        fs.writeFile("./cart.json", JSON.stringify(cartArr), 'utf-8', (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log(`El carrito con id: ${object.id} actualizado exitosamente`);
            }
        return object.id
        });
    }
    async getAll(){
        try {
            const res = await fs.promises.readFile('./cart.json', 'utf-8');
            const data = JSON.parse(res);
            return data
            
        } catch (error) {
            return undefined
            
        }
    } 
    async deleteById(id){
        let data;

        try {
            const res = await fs.promises.readFile('./cart.json', 'utf-8');
            data = JSON.parse(res);
            
            
        } catch (error) {
            console.error(error)
        }

        let cartArr = data ? data : [];

        const newcartArr = cartArr.find(cart => cart.id == id);
        if(newcartArr){
            fs.promises.readFile('./cart.json', 'utf8')
        .then(data => {
            const arrCart = JSON.parse(data);
            const newCartArr = arrCart.filter(cart => cart.id !== id);
            cartArr = newCartArr;
            fs.writeFile("./cart.json", JSON.stringify(newCartArr), 'utf-8', err => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(`Carrito con id: ${id} vaciado y eliminado`);
                }
            });
        })
        .catch(err => console.log(err));
        } else {
            console.log(`EL carrito con id ${id} no se ha encontrado`);
        }
        
    }
    async deleteProductById(cartId, productId){
        let data;

        try {
            const res = await fs.promises.readFile('./cart.json', 'utf-8');
            
            data = JSON.parse(res);
            
            
        } catch (error) {
            console.error(error)
        }
        let cartArr = data ? data : [];
        
        let findCart = cartArr.find(cart => cart.id === cartId);
        const newProductArr = findCart.products.filter(product => product.id !== productId);
        findCart.products = newProductArr;

        const indexCart = cartArr.findIndex(cart => cart.id === cartId);
        cartArr.splice(indexCart, 1, findCart);
        
        fs.writeFile("./cart.json", JSON.stringify(cartArr), 'utf-8', err => {
            if (err) {
                console.log(err);
            } else {
                console.log(`Producto con id: ${productId} eliminado`);
            }
        });
    }

}

module.exports = Cart;