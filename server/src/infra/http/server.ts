import { fastify } from 'fastify';
import fastifyCors from '@fastify/cors';
import { createLinkRoute } from './routes/create-link';
import {
  hasZodFastifySchemaValidationErrors,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod';
import { getLinksRoute } from './routes/get-links';
import { deleteLinkRoute } from './routes/delete-link';

const server = fastify();

server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

server.setErrorHandler((error, request, reply) => {
  if (hasZodFastifySchemaValidationErrors(error)) {
    return reply.status(400).send({
      message: 'Validation error',
      issues: error.validation,
    });
  }

  console.error(error);
  return reply.status(500).send({
    message: 'Internal server error',
  });
});

server.register(fastifyCors, {
  origin: '*',
});

server.register(createLinkRoute);
server.register(getLinksRoute)
server.register(deleteLinkRoute)

server.listen({ port: 3333, host: '0.0.0.0' }).then(() => {
  console.log('Server running on http://localhost:3333!');
});
