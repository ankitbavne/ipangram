module.exports = {
  successResponse: (res, code, message, data) => {
    res.status(code).json({
      status: "SUCCESS",
      code: code,
      message: message,
      data: data,
    });
  },
  CustomError: (res, code = 400, message, data) => {
    const resData = {
      status: "ERROR",
      code: code,
      message: data,
      messageType: message,
    };
    return res.status(code).json(resData);
  },

  conflictErrorMsgResponse: (res, code, resData) => {
    res.status(409).json({
      status: "ERROR",
      code: code,
      message: resData,
    });
  },

  errorMsgResponse: (res, code, resData) => {
    res.status(201).json({
      status: "ERROR",
      code: code,
      message: resData,
    });
  },
};
