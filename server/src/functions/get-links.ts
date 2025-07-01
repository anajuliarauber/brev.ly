import { db } from '@/infra/db';
import { schemas } from '@/infra/db/schemas';
import { links } from '@/infra/db/schemas/links';
import { Either, makeRight } from '@/shared/either';
import { Link } from '@/shared/types';

export async function getLinks(): Promise<Either<never, Link[]>> {
  const links = await db.select().from(schemas.links);
  return makeRight(links);
}
