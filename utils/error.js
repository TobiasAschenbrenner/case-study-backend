export const CreateError = (statusCode, errMessage) => {
  const err = new Error();
  err.status = statusCode;
  err.message = errMessage;
  return err;
};
