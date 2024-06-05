import _ from "lodash";

/*
  This module provides custom validation error handling.
  It helps in extracting nested error messages and fields
  from validation errors returned by Joi.
 
  extractNestedErrorMessages is used to get the root error message
  and all nested error messages in case of a complex error.
  It also extracts the corresponding error fields from the error
  object.
 
 extractNestedErrorFields is used to get the fields for which
  the error occurred. It also handles nested error fields.
 */
export const extractNestedErrorMessages = (error) => {
    const details_path = error.context ? error.context.details : error.details;
    return _.union(
      error.message,
      details_path.map((detail) => {
        if (_.isEmpty(detail.context.details)) {
          return detail.message;
        }
        return extractNestedErrorMessages(detail.context);
      })
    );
  };
  
  export const extractNestedErrorFields = (error) => {
    const details_path = error.context ? error.context.details : error.details;
    return _.union(
      error.path,
      details_path.map((detail) => {
        if (_.isEmpty(detail.context.details)) {
          return _.last(detail.path);
        }
        return extractNestedErrorFields(detail.context);
      })
    );
  };