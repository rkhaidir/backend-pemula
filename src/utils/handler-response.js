const successResponseWithMsg = (h, message, code) => h.response({
  status: 'success',
  message,
}).code(code);

const failedResponseWithMsg = (h, message, code) => h.response({
  status: 'fail',
  message,
}).code(code);

const successResponseWithMsgAndData = (h, message, data, code) => h.response({
  status: 'success',
  message,
  data,
}).code(code);

const successResponseWithData = (h, data, code) => h.response({
  status: 'success',
  data,
}).code(code);

module.exports = {
  successResponseWithMsg,
  failedResponseWithMsg,
  successResponseWithMsgAndData,
  successResponseWithData,
};
