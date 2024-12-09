import { AES, enc } from "crypto-js";
import CryptoJS from "crypto-js";

const secretKey = "aeskeyaeskeyaeskeyaeskeyaeskey31";

const aesKey = CryptoJS.enc.Utf8.parse(secretKey);
const aesIv = CryptoJS.enc.Utf8.parse("0123456789abcdef");
const aesOptions = {
  iv: aesIv,
  mode: CryptoJS.mode.CBC,
  padding: CryptoJS.pad.Pkcs7,
};
export function encryptData(data) {
  const ciphertext = CryptoJS.AES.encrypt(
    data,
    aesKey,
    aesOptions
  ).ciphertext.toString();
  return ciphertext;
}


export function decryptData(encryptedData) {
  const encoded = { ciphertext: CryptoJS.enc.Hex.parse(encryptedData) };
  const decodedText = CryptoJS.enc.Utf8.stringify(
    CryptoJS.AES.decrypt(encoded, aesKey, aesOptions)
  );
  return decodedText;
}
