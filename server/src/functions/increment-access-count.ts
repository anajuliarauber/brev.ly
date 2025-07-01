import { Either, makeLeft, makeRight } from "@/shared/either";
import { LinkNotFound } from "./errors";
import { Link } from "@/shared/types";
import { eq } from "drizzle-orm";
import z from "zod";
import { db } from "@/infra/db";
import { schemas } from "@/infra/db/schemas";

const incrementAccessCountInput = z.object({
  id: z.string().uuid(),
});
type IncrementAccessCountInput = z.input<typeof incrementAccessCountInput>;

export async function incrementAccessCount(input: IncrementAccessCountInput): Promise<Either<LinkNotFound, Link>>{
  const { id } = incrementAccessCountInput.parse(input);

  const existingLink = await db
    .select()
    .from(schemas.links)
    .where(eq(schemas.links.id, id))
    .limit(1)
    .execute();

  if (existingLink.length === 0) {
    return makeLeft(new LinkNotFound());
  }

  const updatedLink = await db
    .update(schemas.links)
    .set({ accessCount: existingLink[0].accessCount + 1 })
    .where(eq(schemas.links.id, id))
    .returning({
      id: schemas.links.id,
      originalUrl: schemas.links.originalUrl,
      shortUrl: schemas.links.shortUrl,
      accessCount: schemas.links.accessCount,
      createdAt: schemas.links.createdAt,
    })
    .execute();

  return makeRight({ ...updatedLink[0] });
}