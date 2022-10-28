import { Joi, celebrate, Segments } from 'celebrate';

const update = () =>
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().email().allow(''),
      confirmEmail: Joi.string().email().valid(Joi.ref('email')).allow(''),
      password: Joi.string().min(8).allow(''),
      name: Joi.string().allow(''),
      birth: Joi.date().allow(''),
      gender: Joi.string().allow(''),
    }),
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().required()
    })
  },{
    abortEarly: false
  });

export default { update } 