import crypto from "crypto";

const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_TOKEN_EXPIRY } = process.env;
import mongoose, { Types } from "mongoose";
import { User } from "../models";

export const jwtVerify = (token) => {
  try {
    const decryptedToken = decryptToken(token);
    return jwt.verify(decryptedToken, JWT_SECRET);
  } catch (error) {
    console.log("error jwtVerify", error);
    throw error;
  }
};
export const jwtDecode = async (token) => {
  try {
    const decyptedToken = decryptToken(token);
    let data = jwt.decode(decyptedToken, { complete: true });
    return data?.payload;
  } catch (error) {
    console.log("error jwtDecode", error);
    throw error;
  }
};

function encryptToken(token) {
  const iv = crypto.randomBytes(16);
  const key = crypto
    .createHash("sha256")
    .update(process.env.JWT_SECRET)
    .digest();
  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
  const encrypted = Buffer.concat([
    cipher.update(token, "utf8"),
    cipher.final(),
  ]);
  return iv.toString("hex") + ":" + encrypted.toString("hex");
}

function decryptToken(encryptedToken) {
  const [ivHex, encryptedHex] = encryptedToken.split(":");
  const iv = Buffer.from(ivHex, "hex");
  const encrypted = Buffer.from(encryptedHex, "hex");
  const key = crypto
    .createHash("sha256")
    .update(process.env.JWT_SECRET)
    .digest();
  const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
  const decrypted = Buffer.concat([
    decipher.update(encrypted),
    decipher.final(),
  ]);
  return decrypted.toString("utf8");
}

export const GenerateAccessToken = (payload) => {
  let token = jwt.sign(payload, process.env.JWT_SECRET, {
    algorithm: "HS256",
    expiresIn: "2000m",
  });
  token = encryptToken(token);
  return token;
};
export const GenerateRefreshToken = (payload) => {
  let token = jwt.sign(payload, process.env.JWT_SECRET, {
    algorithm: "HS256",
    expiresIn: "31d",
  });
  token = encryptToken(token);
  return token;
};
