import { COOKIE_SETTINGS } from '../constants';
import { controllerWrapper } from '../lib/controllerWrapper';
import build_response from '../lib/response/MessageResponse';
import { validateUserCredentials } from '../services/user.service';

export const loginUser = controllerWrapper(async (req, res) => {
  const { email, password } = req.body;

  const { access_token, refresh_token, userInfo } = await validateUserCredentials(email, password);

  res
    .status(200)
    .cookie('accessToken', access_token, COOKIE_SETTINGS)
    .cookie('refreshToken', refresh_token, COOKIE_SETTINGS)
    .json(build_response(true, 'User logged in successfully!', null, null, userInfo));
});

export const logoutUser = controllerWrapper(async (_req, res) => {
  res
    .status(200)
    .clearCookie('accessToken', COOKIE_SETTINGS)
    .clearCookie('refreshToken', COOKIE_SETTINGS)
    .json(build_response(true, 'User logged out successfully!', null, null, null));
});

export const validateUser = controllerWrapper(async (req, res) => {
  res.status(200).json(build_response(true, 'User is authenticated!', null, null, req.user));
});
