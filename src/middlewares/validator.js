import _ from "lodash";
import httpStatus from "http-status";
import Joi from "joi";
import { ApiError } from "../helpers/error/errorTypes.js";
import { extractNestedErrorFields,extractNestedErrorMessages } from "../helpers/custom_validation.js";
export const validate = (schema) => (req, res, next) => {
  const validSchema = _.pick(schema, ["params", "query", "body", "files"]);
  const object = _.pick(req, Object.keys(validSchema));
  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: "key" }, abortEarly: false, dateFormat: "utc" })
    .validate(object);

  if (error) {
    const error_to_log = _.omit(error, "_original.files");
    console.error(`Joi Validation errors: ${JSON.stringify(error_to_log)}`);
    const errorMessage = extractNestedErrorMessages(error);
    const error_fields = extractNestedErrorFields(error);
    return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
  }
  Object.assign(req, value);
  return next();
};
