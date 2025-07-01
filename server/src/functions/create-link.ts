import { Either, makeLeft, makeRight } from "@/shared/either"
import { z } from "zod"
import { db } from "@/infra/db"
import { schemas } from "@/infra/db/schemas"
import { eq } from "drizzle-orm"
import { ShortUrlAlreadyExists } from "./errors"
import { Link } from "@/shared/types"

const createLinksInput = z.object({
  originalUrl: z.string().url(),
  shortUrl: z.string().url(),
})

type CreateLinksInput = z.input<typeof createLinksInput>

export async function createLinks(input: CreateLinksInput): Promise<Either<ShortUrlAlreadyExists, Link>> {
  const {originalUrl, shortUrl} = createLinksInput.parse(input)

  const existingLink = await db.select().from(schemas.links)
    .where(eq(schemas.links.shortUrl, shortUrl))
    .limit(1)
    .execute()

  if (existingLink.length > 0) {
    return makeLeft(new ShortUrlAlreadyExists())
  }

 const result = await
    db.insert(schemas.links).values({
      originalUrl,
      shortUrl,
    }).returning({
      id: schemas.links.id,
      originalUrl: schemas.links.originalUrl,
      shortUrl: schemas.links.shortUrl,
      accessCount: schemas.links.accessCount,
      createdAt: schemas.links.createdAt,
    })
    
    return makeRight({...result[0]})
}