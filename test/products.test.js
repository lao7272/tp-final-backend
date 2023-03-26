import request from "supertest";
import app from "../src/app.js";
import {expect} from "chai";


describe("products CRUD", () => {
    let App = request(app);
    it("should return an array of products", async () => {
        const req = await App.get('/api/productos');
        expect(req.body.dbProducts).to.be.an("array");
        expect(req.statusCode).equal(200);
    });

    it("should return a product", async () => {
        const req = await App.get('/api/productos/6414498118e97e39e75f7447');
        expect(req.body).to.be.an("object");
        expect(req.statusCode).equal(200);
    });

    it("should create a product", async () => {
        const postProduct = {
            name: "Iphone 13",
            price: 500000,
            urlImg: "https://cbafederal.net/wp-content/uploads/2021/10/iphone-13-pro-max-blue-select.png",
            description: "Iphone 13 pro max",
            admin: true
        }

        const req = await App.post('/api/productos').send(postProduct);

        expect(req.body).to.include.keys("name","price","urlImg","description");
        expect(req.statusCode).equal(200)
    });

    it("should update a product", async () => {
        const updateProduct = {
            name: "Iphone 13",
            price: 650000,
            urlImg: "https://cbafederal.net/wp-content/uploads/2021/10/iphone-13-pro-max-blue-select.png",
            description: "Iphone 13 pro max",
            admin: true
        }
        const req = await App.put('/api/productos/6414498118e97e39e75f7447').send(updateProduct);
        
        expect(req.body).to.include.keys("name","price","urlImg","description");
        expect(req.statusCode).equal(200)
    });

    it("should delete a product", async () => {
        const req = await App.delete("/api/productos/63bdba3881604c2dd0135f3f");
        expect(req.statusCode).equal(200);
    });
});