import { FastifyInstance } from "fastify";
import z from "zod";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getUserById,
} from "../controllers/user.controller";

const userSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  email: z.string().email(),
});

const createUserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
});

const updateUserSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
});

export default async function userRoutes(app: FastifyInstance) {
  app.get(
    "/",
    {
      schema: {
        tags: ["users"],
        description: "List all users",
        response: {
          200: userSchema.array(),
        },
      },
    },
    getUsers
  );

  app.get(
    "/:id",
    {
      schema: {
        tags: ["users"],
        description: "Get a user by ID",
        params: z.object({
          id: z.string().uuid(),
        }),
        response: {
          200: userSchema,
        },
      },
    },
    getUserById
  );

  app.post(
    "/",
    {
      schema: {
        tags: ["users"],
        description: "Create a new user",
        body: createUserSchema,
        response: {
          201: z.null(),
        },
      },
    },
    createUser
  );

  app.put(
    "/:id",
    {
      schema: {
        tags: ["users"],
        description: "Update a user by ID",
        params: z.object({
          id: z.string().uuid(),
        }),
        body: updateUserSchema,
        response: {
          200: userSchema,
        },
      },
    },
    updateUser
  );

  app.delete(
    "/:id",
    {
      schema: {
        tags: ["users"],
        description: "Delete a user by ID",
        params: z.object({
          id: z.string().uuid(),
        }),
        response: {
          204: z.null(),
        },
      },
    },
    deleteUser
  );
}
