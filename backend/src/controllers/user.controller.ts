import { USER_LIST } from '../constants';
import { controllerWrapper } from '../lib/controllerWrapper';
import build_response from '../lib/response/MessageResponse';

// GET /api/v1/user
export const getUsers = controllerWrapper(async (req, res) => {
  const { page_number, limit } = req.query;
  console.log(page_number, limit);   
  const pageNumber = parseInt(page_number?.toString() || '1', 10);
  const perPage = parseInt(limit?.toString() || '10', 10);
  const startIndex = (pageNumber - 1) * perPage;
  const endIndex = startIndex + perPage;
  const paginatedUsers = USER_LIST.slice(startIndex, endIndex);

  const total_count = USER_LIST.length;
  res.status(200).json(build_response(true, 'User List Fetched', null, total_count, paginatedUsers));
});

// POST /api/v1/user
export const addUser = controllerWrapper(async (req, res) => {
  const { name, email, image } = req.body;
  const newUser = {
    id: USER_LIST.length + 1,
    name,
    email,
    image,
  };
  USER_LIST.push(newUser);
  res.status(201).json(build_response(true, 'User Added', null, null, newUser));
});