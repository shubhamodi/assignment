export const successResponse = async (req, res, data, code = 200) => {
const result=data;
  // console.log(req.headers);
  // req.status().send({});
  res.status(code).send({
    request:{headers:{"Content-Type":req.headers["content-type"]},body:{base64_image:"A valid base64 encoded image."}},
    response:{headers:{"Content-Type":req.headers["content-type"]},body:{
      success: true,
      result,}
    }});
  };
  
  export const errorResponse = async (req, res, code = 500, errorMessage = "Something went wrong", error = {}) => {
    const statusCode = error.statusCode || code;
    if (code >= 500 && code < 600) {
      console.error(`Error: ${statusCode} ${req?.url} ${errorMessage}`, error);  //server side error
    } else {
      console.warn(`Error ${statusCode} ${req?.url} ${errorMessage}`, error);    //client side error
    }  
  
    res.status(statusCode).json({
      // code: statusCode,
      success: false,
      error: {
        message: errorMessage
      }
      
  });
  };