import axios from "axios";

const updateProduct = {
    name: "Calculadora",
    price: 4800,
    urlImg: "https://i5.walmartimages.com/asr/7f43c8a2-cb3c-4293-ab1a-1a7dba58c609.e4dfb8d308f4266106398d986d9ed3db.jpeg?odnHeight=450&odnWidth=450&odnBg=ffffff",
    description: "Calculadora marca Casio",
    admin: true
}
const postProduct = {
    name: "Iphone 13",
    price: 500000,
    urlImg: "https://cbafederal.net/wp-content/uploads/2021/10/iphone-13-pro-max-blue-select.png",
    description: "Iphone 13 pro max",
    admin: true
}

const api = axios.create({baseURL: 'http://localhost:8080'});

const getProd = api.get('/api/productos');
const getProdId = api.get('/api/productos/63b721ff097f7a681eb0cd19');
const putProd = api.put('/api/productos/63bdba3881604c2dd0135f3f', updateProduct);
const postProd = api.post('/api/productos', postProduct);
const deleteProd = api.delete('/api/productos/64131153d140e774d2b10bbe',{data: {admin: true}});



const productsRes = await Promise.all([ getProd, getProdId, putProd, postProd, deleteProd]);
const productsData = productsRes.map(res => res.data);

console.log(productsData)
