import { controllerWrapper } from '../lib/controllerWrapper';
import build_response from '../lib/response/MessageResponse';
import { addUserSchema, deleteUserSchema, getUserListSchema } from '../lib/zod/user.schema';
import { addUserService, deleteUserService, getUsersService } from '../services/user.service';

// GET /api/v1/user
export const getUsers = controllerWrapper(async (req, res) => {
  const { q, page_number, limit } = getUserListSchema.parse(req.query);

  const { total_count, user_data_list } = await getUsersService(q, page_number, limit);

  res.status(200).json(build_response(true, 'Users List Fetched', null, total_count, user_data_list));
});

// POST /api/v1/user
export const addUser = controllerWrapper(async (req, res) => {
  const { name, email, image } = addUserSchema.parse(req.body);

  const newUser = await addUserService(name, email, image);

  res.status(201).json(build_response(true, 'New User Added', null, null, newUser));
});

// DELETE /api/v1/user/:id
export const deleteUser = controllerWrapper(async (req, res) => {
  const { id } = deleteUserSchema.parse(req.params);

  await deleteUserService(id);

  res.status(200).json(build_response(true, 'User deleted', null, null, null));
});
