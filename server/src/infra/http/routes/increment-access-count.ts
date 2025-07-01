import { incrementAccessCount } from "@/functions/increment-access-count";
import { isRight, unwrapEither } from "@/shared/either";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";

export const incrementAccessCountRoute: FastifyPluginAsyncZod = async server => {
  server.patch(
    '/links/:id/increment-access-count',
    {
      schema: {
        params: z.object({
          id: z.string().uuid(),
        }),
        response: {
          200: z.object({
            id: z.string(),
            originalUrl: z.string().url(),
            shortUrl: z.string().url(),
            accessCount: z.number(),
            createdAt: z.date(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params as { id: string };

      const result = await incrementAccessCount({ id });

      if (isRight(result)) {
        const linkResult = unwrapEither(result);
        return reply.status(200).send(linkResult);
      }

      const error = unwrapEither(result);
      switch (error.constructor.name) {
        case 'LinkNotFound':
          return reply.status(404).send({ message: error.message });
      }
    })
}