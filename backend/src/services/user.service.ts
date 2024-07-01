import { USER_LIST } from '../constants';
import { CustomError } from '../lib/error/custom.error';

export const getUsersService = async (q: string | undefined, page_number: number, limit: number) => {
  const startIndex = (page_number - 1) * limit;
  const endIndex = startIndex + limit;
  const filteredList = q
    ? USER_LIST.filter((user) => user.name.toLowerCase().includes(q.toLowerCase()) || user.email.toLowerCase().includes(q.toLowerCase()))
    : USER_LIST;

  const total_count = filteredList.length;
  const user_data_list = filteredList.slice(startIndex, endIndex);

  return { total_count, user_data_list };
};

export const addUserService = async (name: string, email: string, image: string) => {
  const newUser = {
    id: USER_LIST.length + 1,
    name,
    email,
    image,
  };

  USER_LIST.push(newUser);

  return newUser;
};
export const deleteUserService = async (id: number) => {
  const index = USER_LIST.findIndex((user) => user.id === id);

  if (index === -1) throw new CustomError(404, 'User Not Found', 'User with id: ${id} does not exist in the database');

  USER_LIST.splice(index, 1);
};
