const Joi =require('joi')


const schema = {
    create: Joi.object({
        username:Joi.string().max(150).required(),
        password: Joi.string().max(255).required(),
    })
    
}


module.exports = schema;