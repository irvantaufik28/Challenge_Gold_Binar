const Joi =require('joi')


const schema = {
    create: Joi.object({
        username:Joi.string().max(150).required(),
        name: Joi.string().max(255).required(),
        email: Joi.string().max(255).email().required(),
        password: Joi.string().max(255).required(),
    })
    .options({allowUnknown: true})
}


module.exports = schema;