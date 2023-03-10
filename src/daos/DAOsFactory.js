export default class DAOsFactory {
    constructor (type) {
        this.type = type;
        this.ProductDAO = null;
        this.CartDAO = null;
        this.UserDAO = null;
    }

    async getProductDAO(){
        if (this.ProductDAO) return this.ProductDAO;

        const { default: Product } = await import('./product/ProductMongo.daos.js');
        this.ProductDAO = new Product();
        return this.ProductDAO;
    } 
    async getCartDAO(){
        if (this.CartDAO) return this.CartDAO;

        const { default: Cart } = await import('./cart/CartMongo.daos.js');
        this.CartDAO = new Cart();
        return this.CartDAO;
    } 
    async getUserDAO(){
        if (this.UserDAO) return this.UserDAO;

        const { default: User } = await import('./users/UsersMongoDB.daos.js');
        this.UserDAO = new User();
        return this.UserDAO;
    } 

    async getDAOs(){
        return {
            ProductDAO: this.getCartDAO(),
            CartDAO: this.getCartDAO(),
            UserDAO: this.getUserDAO()
        }
    }
}