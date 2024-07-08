import CryptoJS from 'crypto-js';

export const decryptText = async (encryptedText: string, secretKey: string) => {
  const bytes = CryptoJS.AES.decrypt(encryptedText, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};
