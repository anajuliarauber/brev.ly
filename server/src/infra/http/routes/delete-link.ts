import { deleteLink } from '@/functions/delete-link';
import { isRight, unwrapEither } from '@/shared/either';
import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import z from 'zod';

export const deleteLinkRoute: FastifyPluginAsyncZod = async (server) => {
  server.delete(
    '/links/:id',
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
          404: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params as { id: string };

      const result = await deleteLink({ id });

      if (isRight(result)) {
        return reply.status(200).send(result.right);
      }

      const error = unwrapEither(result);
      switch (error.constructor.name) {
        case 'LinkNotFound':
          return reply.status(404).send({ message: error.message });
      }
    }
  );
};
