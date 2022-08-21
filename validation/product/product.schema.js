const Joi =require('joi')

const schema = {
    create: Joi.object({
        name:Joi.string().max(150).required(),
        price: Joi.number().required(),
        stock: Joi.number().required(),
        category_id: Joi.number().required(),
       
    })
}


module.exports = schema;