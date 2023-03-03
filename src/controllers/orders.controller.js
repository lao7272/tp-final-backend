
import * as CartService from "../services/cart.service.js";

import { sendVerificationEmail } from "../modules/nodemailer/nodemailer.js";

import { sendWhatsappMessage } from "../modules/twilio/twilio.js";


const cartOrder = async (req, res) => {
    const dbCart = await CartService.getCartsDB();
    const idUser = req.session.passport.user.email;
    
    
    const findCart = dbCart.find(cart => cart.idUser == idUser);

    if(!findCart){
        return res.json({message: "No tienes un carrito"});
    }

    const products = findCart.products;

    if (products.length < 0) {
        return res.json({message: "No tienes has agregado productos al carrito"})
    }

    const getProductsNames = products.map(prod => prod.name);
    let productsMessage; 
    for (let i = 0; i < getProductsNames.length; i++) {
        const element = getProductsNames[i];
        productsMessage += ` ${i + 1}-${element}`
    }

    const bodyMessage = {body:`Tus productos del carrito:${productsMessage}`};

    const emailMessage = {
        email: idUser,
        subject: "Compra",
        html: productsMessage
    }

    sendWhatsappMessage(bodyMessage);
    sendVerificationEmail(emailMessage);
    
    res.json({cart: products})
}

export {
    cartOrder
}