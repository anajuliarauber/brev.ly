import { getOriginalUrl } from '@/functions/get-original-url';
import { isRight, unwrapEither } from '@/shared/either';
import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';

export const redirectRoute: FastifyPluginAsyncZod = async (server) => {
  server.get(
    '/:shortUrl',
    {
      schema: {
        params: z.object({
          shortUrl: z.string().min(1, 'Short URL must not be empty'),
        }),
        response: {
          302: z.object({
            message: z.string().optional(),
          }),
          404: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { shortUrl } = request.params as { shortUrl: string };

      const result = await getOriginalUrl({ shortUrl });

      if (isRight(result)) {
        return reply.status(302).redirect(result.right);
      }

      const error = unwrapEither(result);
      switch (error.constructor.name) {
        case 'LinkNotFound':
          return reply.status(404).send({ message: error.message });
      }
    }
  );
};
