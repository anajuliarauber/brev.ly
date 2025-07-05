import { db } from '@/infra/db';
import { schemas } from '@/infra/db/schemas';
import { Either, makeLeft, makeRight } from '@/shared/either';
import { eq } from 'drizzle-orm';
import { z } from 'zod';
import { LinkNotFound } from './errors';

const getOriginalUrlInput = z.object({
  shortUrl: z.string().min(1, 'Short URL must not be empty'),
});

type GetOriginalUrlInput = z.infer<typeof getOriginalUrlInput>;

export type GetOriginalUrlOutput = {
  originalUrl: string;
  id: string;
};

export async function getOriginalUrl(
  input: GetOriginalUrlInput
): Promise<Either<LinkNotFound, GetOriginalUrlOutput>> {
  const { shortUrl } = getOriginalUrlInput.parse(input);

  const completeShortUrl = `http://localhost:3333/${shortUrl}`;

  const existingLink = await db
    .select()
    .from(schemas.links)
    .where(eq(schemas.links.shortUrl, completeShortUrl))
    .limit(1)
    .execute();

  if (existingLink.length === 0) {
    return makeLeft(new LinkNotFound());
  }

  return makeRight({originalUrl:existingLink[0].originalUrl, id: existingLink[0].id});
}
