//server side validation
const Joi = require("joi");
//For Server Side Validation -- New Listing Validation
module.exports.listingSchema = Joi.object({
    listing : Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        price: Joi.number().required().min(0),
        location: Joi.string().required(),
        country: Joi.string().required(),
        image: Joi.object({
      url: Joi.string().uri().allow("", null),
      // filename: Joi.string(),
    }).required()
  }).required()
});

// Review Validation
module.exports.reviewSchema = Joi.object({
  review: Joi.object({
    rating: Joi.number().min(1).max(5).required(),
    comment: Joi.string().required(),
    
  }).required(),

})

