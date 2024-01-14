import Joi from "joi";

export const endeksSchema = Joi.object({
  date: Joi.date().iso().required().messages({
    "date.base": "'date' should be a valid date in YYYY-MM-DD format",
    "date.format": "'date' should be in YYYY-MM-DD format",
    "any.required": "'date' is a required field",
  }),
  value: Joi.number().integer().greater(0).required().messages({
    "number.base": "'value' should be a number",
    "number.integer": "'value' should be an integer",
    "number.greater": "'value' must be greater than 0",
    "any.required": "'value' is a required field",
  }),
  userId: Joi.number().integer().optional()
});
