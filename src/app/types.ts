import type {
  FastifyBaseLogger,
  FastifyInstance,
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
} from "fastify";
import type { Server } from "http";
import type { ZodTypeProvider } from "fastify-type-provider-zod";

export type FastifyTypeinstance = FastifyInstance<
  Server,
  RawRequestDefaultExpression,
  RawReplyDefaultExpression,
  FastifyBaseLogger,
  ZodTypeProvider
>;
