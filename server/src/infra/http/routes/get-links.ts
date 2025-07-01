import { getLinks } from "@/functions/get-links";
import { isRight, unwrapEither } from "@/shared/either";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";

export const getLinksRoute: FastifyPluginAsyncZod = async server =>{
  server.get(
    '/links',
    {
      schema: {
        response: {
          200: z.array(z.object({
            id: z.string(),
            originalUrl: z.string().url(),
            shortUrl: z.string().url(),
            accessCount: z.number(),
            createdAt: z.date(),
          })),
        },
      },
    },
    async (request, reply) => {
      const result = await getLinks();
      if (isRight(result)) {
        return reply.status(200).send(unwrapEither(result));
      }
    }
  );
}