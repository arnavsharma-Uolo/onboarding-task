const sharp = require('sharp');
const { CustomError } = require('../lib/error/custom.error');

const resizeImage = async (image: any, width: number, height: number) => {
  try {
    if (width <= 0 || height <= 0) {
      throw new Error('Width and height must be positive integers');
    }

    return await sharp(image).resize(width, height, { fit: 'cover' }).toBuffer();
  } catch (error) {
    throw new CustomError(500, 'Internal Server Error', 'Error resizing image');
  }
};

export default resizeImage;
