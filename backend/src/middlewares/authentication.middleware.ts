import jwt, { JwtPayload } from 'jsonwebtoken';
import { ACCESS_TOKEN_SECRET, COOKIE_SETTINGS, REFRESH_TOKEN_SECRET } from '../constants';
import { controllerWrapper } from '../lib/controllerWrapper';
import { CustomError } from '../lib/error/custom.error';
import { generateUserToken, User } from '../models/user.model';
import { getUserService } from '../services/user.service';

export const authenticationMiddleware = controllerWrapper(async (req, res, next) => {
  const { accessToken, refreshToken } = req.cookies || {};

  if (!accessToken) {
    throw new CustomError(401, 'Invalid Access Token', 'User is not authenticated!');
  }

  let userDetails;

  try {
    const decodedToken = jwt.verify(accessToken, ACCESS_TOKEN_SECRET) as JwtPayload;
    userDetails = await getUserService(decodedToken?.id);
  } catch (error) {
    if (!refreshToken) {
      throw new CustomError(401, 'Invalid Refresh Token', 'User is not authenticated!');
    }

    try {
      const refresh_token = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET) as JwtPayload;
      userDetails = await User.findById(refresh_token?.id);

      if (!userDetails) {
        throw new CustomError(401, 'Invalid Refresh Token', 'User is not authenticated!');
      }

      const { access_token: new_access_token, refresh_token: new_refresh_token } = await generateUserToken(userDetails);
      res.cookie('accessToken', new_access_token, COOKIE_SETTINGS);
      res.cookie('refreshToken', new_refresh_token, COOKIE_SETTINGS);
    } catch (error) {
      throw new CustomError(401, 'Invalid Refresh Token', 'User is not authenticated!');
    }
  }

  if (!userDetails) {
    res.sendStatus(401);
    throw new CustomError(401, 'Invalid Access Token', 'Access Token is required!');
  }

  req.user = userDetails;
  next();
});
