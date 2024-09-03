

const successResponse = (res, data, message = 'Request successful') => {
  res.status(200).json({
    success: true,
    message,
    data,
  });
};

const successResponseWithoutData = (res, message= 'Request Successful') =>{
      res.status(200).json({
        success: true,
        message,
      });

}

const errorResponse = (res, error, message = 'Request failed') => {
  res.status(500).json({
    success: false,
    message,
    error: error.message || error,
  });
};

const notFoundResponse = (res, message = 'Resource not found') => {
  res.status(404).json({
    success: false,
    message,
  });
};


const userAlreadyExists = (res) => {
    return res.status(409).json({
        success: false,
        message: 'User already exists'
    });
};

const wrongPasswordResponse = (res) => {
  return res.status(401).json({
    success: false,
    message: 'Incorrect password. Please try again.',
  });
};


const validationErrorResponse = (
  res,
  message = 'Validation failed'
) => {
  res.status(400).json({
    success: false,
    message,
  });
};

export {
  successResponse,
  errorResponse,
  notFoundResponse,
  validationErrorResponse,
  userAlreadyExists,
  successResponseWithoutData,
  wrongPasswordResponse,
};
