import { FastifyReply, FastifyRequest } from "fastify";
import { randomUUID } from "crypto";
import { User } from "../types/user.types";

// Simulação de banco de dados em memória
const users: User[] = [];

// Função para listar todos os usuários
export const getUsers = async (_: FastifyRequest, reply: FastifyReply) => {
  return reply.send(users);
};

// Função para buscar um usuário pelo ID
export const getUserById = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  const { id } = request.params;
  const user = users.find((u) => u.id === id);

  if (!user) {
    return reply.status(404).send({ message: "User not found" });
  }

  return reply.send(user);
};

// Função para criar um novo usuário
export const createUser = async (
  request: FastifyRequest<{ Body: { name: string; email: string } }>,
  reply: FastifyReply
) => {
  const { name, email } = request.body;

  const user: User = {
    id: randomUUID(),
    name,
    email,
  };

  users.push(user);

  return reply.status(201).send();
};

// Função para atualizar um usuário pelo ID
export const updateUser = async (
  request: FastifyRequest<{
    Params: { id: string };
    Body: { name?: string; email?: string };
  }>,
  reply: FastifyReply
) => {
  const { id } = request.params;
  const { name, email } = request.body;

  const userIndex = users.findIndex((u) => u.id === id);

  if (userIndex === -1) {
    return reply.status(404).send({ message: "User not found" });
  }

  users[userIndex] = {
    ...users[userIndex],
    ...(name && { name }),
    ...(email && { email }),
  };

  return reply.send(users[userIndex]);
};

// Função para deletar um usuário pelo ID
export const deleteUser = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  const { id } = request.params;

  const userIndex = users.findIndex((u) => u.id === id);

  if (userIndex === -1) {
    return reply.status(404).send({ message: "User not found" });
  }

  users.splice(userIndex, 1);

  return reply.status(204).send();
};
