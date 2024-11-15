import { checkSchema, validationResult } from "express-validator";
import { getByCode } from "../../DTO/general/getByCode.dto.js";

export const CodeValidator = [
  checkSchema(getByCode)
]