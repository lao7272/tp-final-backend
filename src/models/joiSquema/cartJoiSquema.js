import Joi from "joi";
const cartJoi = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required(),
    urlImg: Joi.string().required(),
    description: Joi.string().required(),
    stock: Joi.number().required(),
    admin: Joi.boolean()
});

export default cartJoi;
