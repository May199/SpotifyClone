import { isCelebrateError } from "celebrate";
import HTTP from 'http'

export default (opts = {}) => {

  const statusCode = 400
  return (err: any, req: any, res: any, next: any) => {
  // If this isn't a Celebrate error, send it to the next error handler
    if (!isCelebrateError(err)) {
      return next(err);
    }
    const validation: any = {};
    // eslint-disable-next-line no-restricted-syntax
    for (const [segment, joiError] of err.details.entries()) {
      validation[segment] = {
        keys: joiError.details.map((detail) => detail.path.join('.')),
        message: joiError.details.map( detail => detail.message),
      };
    }

    const result = {
      statusCode,
      error: HTTP.STATUS_CODES[statusCode],
      validation,
    };

    return res.status(statusCode).send(result);
  };
};