import CryptoJS from 'crypto-js';

export const encryptText = async(text, secretKey) => {
  return CryptoJS.AES.encrypt(text, secretKey).toString();
};
