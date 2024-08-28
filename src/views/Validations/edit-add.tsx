import Joi from 'joi';

const formSchema = Joi.object({
  id: Joi.alternatives().try(Joi.string(), Joi.number()).optional(), // champ id généré automatiquement
  name: Joi.string().trim().required().messages({
    'string.empty': 'Le nom est obligatoire'
  }),
  phone: Joi.string().trim().required().pattern(/^[+\s0-9]+$/).messages({
    'string.empty': 'Le numéro de téléphone est obligatoire',
    'string.pattern.base': 'Le numéro de téléphone doit contenir uniquement des chiffres'
  }),
  password: Joi.string().trim().required().min(6).messages({
    'string.empty': 'Le mot de passe est obligatoire',
    'string.min': 'Le mot de passe doit contenir au moins 6 caractères'
  }),
  role: Joi.string().valid('Admin', 'User').required().messages({
    'any.only': 'Le rôle doit être soit "Admin" soit "User"',
    'string.empty': 'Le rôle est obligatoire'
  })
});


export const validateForm = (formData: any) => {
  const { error } = formSchema.validate(formData, { abortEarly: false });
  if (!error) return {};

  return error.details.reduce((acc: any, curr: any) => {
    acc[curr.path[0]] = curr.message;
    return acc;
  }, {});
};
