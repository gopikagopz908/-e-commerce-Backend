export const productValidationSchema = Joi.object({
    _id: Joi.string().optional(),
    title: Joi.string().min(3).max(50).required(),
    price: Joi.number().positive().required(),
    quantity: Joi.number().integer().min(0).required(),
    url: Joi.string().uri().optional(),
    description: Joi.string().min(10).max(500).required(),
    category: Joi.string().min(3).max(50).required(),
    isDelete: Joi.boolean().default(false),
  });
  