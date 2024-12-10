
const fs = require("fs");

export const generateOTP = () => {
  return Math.floor(10000 + Math.random() * 90000);
};

export const generateUniqueToken = (length = 10) => {
  const characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let token = "";
  for (let i = 0; i < length; i++) {
    token += characters[Math.floor(Math.random() * characters.length)];
  }
  return token;
};

export const isEmail = async (email) => {
  try {
    return email.includes("@") ? true : false;
  } catch (error) {
    throw error;
  }
};

export const capitalizeWords = (inputString) => {
  return inputString.replace(/\b\w/g, (char) => char.toUpperCase());
};

export const logger = async (...arg) => {
  console.log(`${new Date()}`, ...arg);
};

