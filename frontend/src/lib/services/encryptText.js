import CryptoJS from 'crypto-js';

export const EncryptText = async (text, secretKey) => {
	return CryptoJS.AES.encrypt(text, secretKey).toString();
};
