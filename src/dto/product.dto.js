export default class ProductsDTO {
    constructor({_id, name, price, urlImg, description, timestamp, stock}){
        this.id = _id;
        this.name = name;
        this.price = price;
        this.urlImg = urlImg;
        this.description = description;
        this.stock = stock;
    }
}
