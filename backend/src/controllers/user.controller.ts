import { controllerWrapper } from '../lib/controllerWrapper';
import { CustomError } from '../lib/error/custom.error';
import build_response from '../lib/response/MessageResponse';
import { addUserSchema, userIDSchema, getUserListSchema } from '../lib/zod/user.schema';
import { addUserService, deleteUserService, getUserService, getUsersService } from '../services/user.service';

// GET /api/v1/user
export const getUsers = controllerWrapper(async (req, res) => {
  const { q, page, limit } = getUserListSchema.parse(req.query);

  const { total_count, user_data_list } = await getUsersService(q, page, limit);

  res.status(200).json(build_response(true, 'Users List Fetched', null, total_count, user_data_list));
});

// GET /api/v1/user/:id
export const getUser = controllerWrapper(async (req, res) => {
  const { id } = userIDSchema.parse(req.params);

  const user = await getUserService(id);

  res.status(200).json(build_response(true, 'Users List Fetched', null, null, user));
});

// POST /api/v1/user
export const addUser = controllerWrapper(async (req, res) => {
  const { name, email, password } = addUserSchema.parse(req.body);
  if (!req.file) throw new CustomError(400, 'Invalid Payload', 'Image is required');

  await addUserService(name, email, password, req.file);

  res.status(201).json(build_response(true, 'New User Added', null, null, null));
});

// DELETE /api/v1/user/:id
export const deleteUser = controllerWrapper(async (req, res) => {
  const { id } = userIDSchema.parse(req.params);
  if (id === req.user.id.toString()) throw new CustomError(400, 'Invalid Payload', 'User cannot delete himself');

  await deleteUserService(id);

  res.status(200).json(build_response(true, 'User deleted', null, null, null));
});
