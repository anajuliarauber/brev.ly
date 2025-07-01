import { db } from '@/infra/db';
import { schemas } from '@/infra/db/schemas';
import { Either, makeLeft, makeRight } from '@/shared/either';
import { eq } from 'drizzle-orm';
import z from 'zod';
import { LinkNotFound } from './errors';
import { Link } from '@/shared/types';

const deleteLinkInput = z.object({
  id: z.string().uuid(),
});

type DeleteLinkInput = z.input<typeof deleteLinkInput>;

export async function deleteLink(
  input: DeleteLinkInput
): Promise<Either<LinkNotFound, Link>> {
  const { id } = deleteLinkInput.parse(input);

  const existingLink = await db
    .select()
    .from(schemas.links)
    .where(eq(schemas.links.id, id))
    .limit(1)
    .execute();

  if (existingLink.length === 0) {
    return makeLeft(new LinkNotFound());
  }

  const result = await db
    .delete(schemas.links)
    .where(eq(schemas.links.id, id))
    .returning({
      id: schemas.links.id,
      originalUrl: schemas.links.originalUrl,
      shortUrl: schemas.links.shortUrl,
      accessCount: schemas.links.accessCount,
      createdAt: schemas.links.createdAt,
    })
    .execute();

  return makeRight({ ...result[0] });
}
