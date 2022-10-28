import { Joi, celebrate, Segments } from 'celebrate';

const create = () =>
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().email().required(),
      confirmEmail: Joi.string().email().valid(Joi.ref('email')).required(),
      password: Joi.string().min(8).required(),
      name: Joi.string().required(),
      birth: Joi.date().required(),
      gender: Joi.string().required(),
    }),
  },{
    abortEarly: false
  });

export default { create } 