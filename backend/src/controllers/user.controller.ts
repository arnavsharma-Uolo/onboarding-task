import { USER_LIST } from '../constants';
import { controllerWrapper } from '../lib/controllerWrapper';
import build_response from '../lib/response/MessageResponse';
import { addUserSchema, deleteUserSchema, getUserListSchema } from '../lib/zod/user.schema';

// GET /api/v1/user
export const getUsers = controllerWrapper(async (req, res) => {
  const { q, page_number, limit } = getUserListSchema.parse(req.query);

  const startIndex = (page_number - 1) * limit;
  const endIndex = startIndex + limit;
  const filteredList = q
    ? USER_LIST.filter(
        (user) =>
          user.name.toLowerCase().includes(q.toLowerCase()) ||
          user.email.toLowerCase().includes(q.toLowerCase()),
      )
    : USER_LIST;
  
  const total_count = filteredList.length;
  const user_data_list = filteredList.slice(startIndex, endIndex);

  res.status(200).json(build_response(true, 'User List Fetched', null, total_count, user_data_list));
});

// POST /api/v1/user
export const addUser = controllerWrapper(async (req, res) => {
  const { name, email, image } = addUserSchema.parse(req.body);

  const newUser = {
    id: USER_LIST.length + 1,
    name,
    email,
    image,
  };
  USER_LIST.push(newUser);
  res.status(201).json(build_response(true, 'User Added', null, null, newUser));
});

// DELETE /api/v1/user/:id
export const deleteUser = controllerWrapper(async (req, res) => {
  const { id } = deleteUserSchema.parse(req.params);

  const index = USER_LIST.findIndex((user) => user.id === id);

  if (index === -1) {
    res.status(404).json(build_response(false, 'User not found', null, null, null));
    return;
  }

  USER_LIST.splice(index, 1);

  res.status(200).json(build_response(true, 'User deleted', null, null, null));
});
