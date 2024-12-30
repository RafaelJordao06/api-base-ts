import z from "zod";
import { FastifyTypeinstance } from "./types";
import { randomUUID } from "crypto";

interface User {
  id: string;
  name: string;
  email: string;
}

const users: User[] = [];

export async function routes(app: FastifyTypeinstance) {
  app.get(
    "/users",
    {
      schema: {
        tags: ["users"],
        description: "List users",
        response: {
          200: z
            .array(
              z.object({
                id: z.string().uuid(),
                name: z.string(),
                email: z.string().email(),
              })
            )
            .describe("List of users"),
        },
      },
    },
    () => {
      return users;
    }
  );

  app.post(
    "/users",
    {
      schema: {
        tags: ["users"],
        description: "Create a new user",
        body: z.object({
          name: z.string(),
          email: z.string().email(),
        }),
        response: {
          201: z.null().describe("User created"),
        },
      },
    },
    async (request, reply) => {
      const { name, email } = request.body;

      const user: User = {
        id: randomUUID(),
        name,
        email,
      };

      users.push(user);

      return reply.status(201).send();
    }
  );
}
