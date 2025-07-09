import { getOriginalUrl } from '@/functions/get-original-url';
import { incrementAccessCount } from '@/functions/increment-access-count';
import { isRight, unwrapEither } from '@/shared/either';
import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';

export const resolveShortUrlRoute: FastifyPluginAsyncZod = async (server) => {
  server.get(
    '/links/resolve/:shortUrl',
    {
      schema: {
        params: z.object({
          shortUrl: z.string().min(1, 'Short URL must not be empty'),
        }),
        response: {
          200: z.object({ originalUrl: z.string().url() }),
          404: z.object({ message: z.string() }),
        },
      },
    },
    async (request, reply) => {
      const { shortUrl } = request.params as { shortUrl: string };

      const result = await getOriginalUrl({ shortUrl });

      if (isRight(result)) {
         await incrementAccessCount({ id: result.right.id });
        const { originalUrl } = result.right;
        return reply.status(200).send({ originalUrl });
      }

      const error = unwrapEither(result);
      switch (error.constructor.name) {
        case 'LinkNotFound':
          return reply.status(404).send({ message: error.message });
      }
    }
  );
};
