import productJoi from "../models/joiSquema/productJoiSquema.js"
const validateProduct = (req, res, next) => {
    const { error } = productJoi.validate(req.body);
    if (error) return res.send(error.details[0].message);
    next();
}
export default validateProduct;