import { checkSchema, param, validationResult } from 'express-validator';

export const idParamsValidator = [
    param('id')
    .exists({ checkNull: false})
    .withMessage('ID is required')
    .isUUID()
    .withMessage('ID must be a valid UUID')
];
