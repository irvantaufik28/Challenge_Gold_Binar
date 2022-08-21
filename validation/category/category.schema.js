const Joi =require('joi')

const schema = {
    create: Joi.object({
        name:Joi.string().max(150).required(),
       
    })
}


module.exports = schema;