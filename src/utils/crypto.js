import CryptoJS from "crypto-js";

const salt = "2d7e3ba5";

export const hashPassword = (password) => {
  return CryptoJS.HmacSHA256(password, salt).toString(CryptoJS.enc.Hex);
};