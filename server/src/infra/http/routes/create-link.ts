import { createLinks } from '@/functions/create-link';
import { isRight, unwrapEither } from '@/shared/either';
import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';

const createLinkBodySchema = z.object({
  originalUrl: z.string().url(),
  shortUrl: z.string().url()
});

type CreateLinkBody = z.infer<typeof createLinkBodySchema>;

export const createLinkRoute: FastifyPluginAsyncZod = async (server) => {
  server.post(
    '/links',
    {
      schema: {
        body: z.object({
          originalUrl: z.string().url(),
          shortUrl: z.string().url(),
        }),
        response: {
          201: z.object({
            id: z.string(),
            originalUrl: z.string().url(),
            shortUrl: z.string().url(),
            accessCount: z.number(),
            createdAt: z.date(),
          }),
          409: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { originalUrl, shortUrl } = request.body as CreateLinkBody;

      const result = await createLinks({ originalUrl, shortUrl });

      if (isRight(result)) {
        const linkResult = unwrapEither(result);
        return reply.status(201).send(linkResult);
      }

      const error = unwrapEither(result);
      switch (error.constructor.name) {
        case 'ShortUrlAlreadyExists':
          return reply.status(409).send({ message: error.message });
      }
      return reply.status(409).send({ message: error.message });
    }
  );
};
