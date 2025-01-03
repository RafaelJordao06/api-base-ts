import { randomUUID } from "crypto";
import { User } from "../types/user.types";

const users: User[] = [];

// Lista todos os usuários
export const getAllUsers = (): User[] => {
  return users;
};

// Busca um usuário pelo ID
export const getUserById = (id: string): User | null => {
  const user = users.find((u) => u.id === id);
  return user || null;
};

// Cria um novo usuário
export const createUser = (name: string, email: string): User => {
  const newUser: User = {
    id: randomUUID(),
    name,
    email,
  };
  users.push(newUser);
  return newUser;
};

// Atualiza um usuário pelo ID
export const updateUser = (
  id: string,
  name?: string,
  email?: string
): User | null => {
  const userIndex = users.findIndex((u) => u.id === id);

  if (userIndex === -1) {
    return null;
  }

  users[userIndex] = {
    ...users[userIndex],
    ...(name && { name }),
    ...(email && { email }),
  };

  return users[userIndex];
};

// Remove um usuário pelo ID
export const deleteUser = (id: string): boolean => {
  const userIndex = users.findIndex((u) => u.id === id);

  if (userIndex === -1) {
    return false;
  }

  users.splice(userIndex, 1);
  return true;
};
