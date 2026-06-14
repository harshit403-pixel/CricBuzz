import { StatusCodes } from "http-status-codes";

const sendResponse = (res, statusCode, message, data = null) => {
  const responseBody = {
    success: true,
  };

  if (message) responseBody.message = message;
  if (data !== null && data !== undefined) {
    responseBody.data = data;
  }

  return res.status(statusCode || StatusCodes.OK).json(responseBody);
};

export default sendResponse;
