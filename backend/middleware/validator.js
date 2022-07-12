const { body } = require('express-validator');

module.exports.validateOffer = [
    body("category").notEmpty(),
    body("make").notEmpty(),
    body("model").notEmpty(),
    body("fuel").notEmpty(),
    body("year").notEmpty().isNumeric(),
    body("km").notEmpty().isNumeric(),
    body("price").notEmpty().isNumeric(),
    body("contact.name").notEmpty(),
    body("contact.city").notEmpty(),
    body("contact.postal_code").notEmpty(),
    body("contact.number").notEmpty(),
    body("contact.email").notEmpty().isEmail()
]