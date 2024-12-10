import _ from "lodash";

import { v4 as uuidv4 } from "uuid";

export const successResponse = (req, res, data, code = 200) =>
  res.status(code).send({
    code,
    data,
    success: true,
  });

export const fileResponse = (req, res, file, code = 200) =>
res.sendFile(file, (err) => {
  if (err) {
    console.error('Failed to send the image:', file, err);
    throw err;
  }
});

export const errorResponse = (req, res, code = 500, errorMessage = "Something went wrong", error = {}, errorfields = {}) => {
  res.status(code).json({
    code,
    errorMessage,
    error,
    errorfields,
    success: false,
  });
};
export const uptoDecimalPoints = (val, upto=2) =>
  parseFloat(parseFloat(val).toFixed(upto));

export const validateFields = (object, fields) => {
  const errors = [];
  fields.forEach((f) => {
    if (!(object && object[f])) {
      errors.push(f);
    }
  });
  return errors.length ? `${errors.join(", ")} are required fields.` : "";
};

export const generateOtp = async () => {
  return Math.floor(1000 + Math.random() * 9000);
}

export const generateOtpToken = async (length = 10) => {
  const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let token = "";
    for (let i = 0; i < length; i++) {
      token += characters[Math.floor(Math.random() * characters.length)];
    }
    return token;
  };

