import Joi from 'joi';

const userSchema = Joi.object({
  name: Joi.string().trim().min(2).max(50).required().messages({
    'string.empty': 'Name is required',
    'string.min': 'Name must be at least 2 characters',
    'string.max': 'Name must be less than 50 characters',
  }),
  age: Joi.number().integer().greater(9).less(100).required().messages({
    'any.required': 'Age is required',
    'number.base': 'Age must be a number',
    'number.greater': 'Age must be over 9',
    'number.less': 'Age must be under 100',
  }),
});

export default userSchema;