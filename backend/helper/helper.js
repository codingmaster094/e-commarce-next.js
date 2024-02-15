
function validatePassword(password) {
  const errors = [];

  // epmty password 
  if (password == "") {
    errors.push("password is Required.");
  }

  // Check the length
  if (password.length < 8) {
    errors.push("Contain at least 8 characters.");
  }

  // Check for at least one lowercase letter
  if (!/[a-z]/.test(password)) {
    errors.push("Contain upper and lower case letters.");
  }

  // Check for at least one number
  if (!/\d/.test(password)) {
    errors.push("Contain at least one number (0 to 9).");
  }

  // Check for at least one special character
  if (!/[!?$§#...]/.test(password)) {
    errors.push("Contain a special character (!?$§#...).");
  }

  // Return the array of error messages
  return errors;
}

const catchError = (msg) => {
  return {
    status: false,
    response_code: 400,
    response_message: msg,
  };
};

const successResponse = (msg) => {
  return {
    status: true,
    response_code: 200,
    response_message: msg,
  };
};

const ErrorResponse = (msg) => {
  return {
    status: false,
    response_code: 400,
    response_message: msg,
  };
};

const findsuccess = (msg, data) => {
  return {
    status: true,
    response_code: 200,
    response_message: msg,
    data: data,
  };
};
const findError = (msg, data) => {
  return {
    status: false,
    response_code: 404,
    response_message: msg,
    data: data,
  };
};

const ForbiddenError = (msg) => {
  return {
    status: false,
    response_code: 429,
    response_message: msg,
  };
};

const requiredError = (msg) => {
  return {
    status: false,
    response_code: 400,
    response_message: msg,
  };
};



// ############################################


const dataResponse = (msg, data) => {
  return {
    status: true,
    response_code: 200,
    response_message: msg,
    data: data,
  };
};

const AuthError = (msg) => {
  return {
    status: false,
    response_code: 429,
    response_message: msg,
  };
};
const Authsuccess = (msg) => {
  return {
    status: true,
    response_code: 200,
    response_message: msg,
  };
};



export default {
  AuthError,
  Authsuccess,
  validatePassword,
  successResponse,
  ErrorResponse,
  findsuccess,
  findError,
  requiredError,
  ForbiddenError,
  dataResponse,
  catchError,
  };
