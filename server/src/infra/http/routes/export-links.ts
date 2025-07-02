import { unwrapEither } from '@/shared/either';
import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { exportLinks } from '@/functions/export-links';
import z from 'zod';

export const exportLinksRoute: FastifyPluginAsyncZod = async (server) => {
  server.post(
    '/links/export',
    {
      schema: {
        response: {
          200: z.object({
            reportUrl: z.string().url(),
          }),
        },
      },
    },
    async (request, reply) => {
      const result = await exportLinks();

      const { reportUrl } = unwrapEither(result);

      return reply.status(200).send({ reportUrl });
    }
  );
};
