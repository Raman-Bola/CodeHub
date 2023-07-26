const Joi = require('joi')

module.exports.dsaSchema= Joi.object({
    dsa:Joi.object({
        title:Joi.string().required(),
        topics:[Joi.string().required()],
        description:Joi.string().required(),
        link:Joi.string()
    })
}) 

module.exports.devSchema= Joi.object({
    dev:Joi.object({
        title:Joi.string().required(),
        topics:[Joi.string().required()],
        description:Joi.string().required(),
        link:Joi.string()
    })
}) 

module.exports.acadSchema= Joi.object({
    dev:Joi.object({
        title:Joi.string().required(),
        topics:[Joi.string().required()],
        description:Joi.string().required(),
        link:Joi.string()
    })
}) 

module.exports.reviewSchema=Joi.object({
    review:Joi.object({
        body:Joi.string().required(),
        rating:Joi.string().required().min(1).max(5),
    }).required()
})