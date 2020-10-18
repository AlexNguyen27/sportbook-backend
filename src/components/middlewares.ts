import { flow } from 'lodash';
import joi, { ValidationResult } from 'joi';
import jwt from 'jsonwebtoken';

import { SchemaValidationError, AuthorizationError, AuthenticationError } from './errors';
import config from './config';

export const middleware = (...parameters: any[]) => (root?: any, args?: any, context?: any, info?: any) => {
  const resolver = parameters[parameters.length - 1];
  flow([...parameters.slice(0, parameters.length - 1)])(root, args, context, info);
  return resolver(root, args, context, info);
};

export const schemaValidation = (schema: any = {}) => (...rest: any[]) => {
  const root = rest[0];
  const args = rest[1];
  const value = {
    ...root,
    ...args,
  };
  const validateOptions = { allowUnknown: true, abortEarly: false };
  const validation: ValidationResult<any> = joi.validate(value, schema, validateOptions);
  if (validation.error) {
    throw new SchemaValidationError(validation.error);
  }
  return rest;
};

// validate token
export const tokenValidation = (...allowed: any[]) => (...rest: any[]) => {
  const context = rest[2];
  // console.log('context0-----------------', context);
  const { token } = context;
  if (!token) {
    throw new AuthenticationError('No token provided');
  }
  const { secretKey } = config.jwt;
  jwt.verify(token, secretKey, (err: any, payload: any) => {
    if (err) {
      throw new AuthenticationError('Invalid access token');
    }
    if (allowed.indexOf(payload.role) > -1) {
      // eslint-disable-next-line no-param-reassign
      rest[2].user = payload;
      return rest;
    }
    throw new AuthorizationError('Your role is not allowed');
  });
};
