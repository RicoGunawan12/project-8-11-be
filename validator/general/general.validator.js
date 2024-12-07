import { checkSchema } from "express-validator"

export function generalValidator(schema){
    return checkSchema(schema)
}