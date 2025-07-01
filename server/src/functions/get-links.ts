import { db } from '@/infra/db';
import { schemas } from '@/infra/db/schemas';
import { links } from '@/infra/db/schemas/links';
import { Either, makeRight } from '@/shared/either';

type GetLinksOutput = {
  id: string;
  originalUrl: string;
  shortUrl: string;
  accessCount: number;
  createdAt: Date;
}[];

export async function getLinks(): Promise<Either<never, GetLinksOutput>> {
  const links = await db.select().from(schemas.links);
  return makeRight(links);
}
