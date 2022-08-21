const Joi =require('joi')


const schema = {
    create: Joi.object({
        username:Joi.string().max(150).required(),
        // email: Joi.string().max(255).required().email(),
        password: Joi.string().max(255).required(),
    })
    .options({allowUnknown: true})
}


module.exports = schema;