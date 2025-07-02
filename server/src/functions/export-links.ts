import { PassThrough, Transform } from 'node:stream';
import { pipeline } from 'node:stream/promises';
import { db } from '@/infra/db';
import { schemas } from '@/infra/db/schemas';
import { uploadFileToStorage } from '@/infra/storage/upload-file-to-storage';
import { type Either, makeRight } from '@/shared/either';
import { stringify } from 'csv-stringify';
import { ilike } from 'drizzle-orm';
import { z } from 'zod';
import postgres from 'postgres';

type ExportLinksOutput = {
  reportUrl: string;
};

export async function exportLinks(): Promise<Either<never, ExportLinksOutput>> {
  const { sql, params } = db.select().from(schemas.links).toSQL();

  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error('DATABASE_URL is not defined');
  }
  const cursor = postgres(databaseUrl)
    .unsafe(sql, params as string[])
    .cursor(2);

  const csv = stringify({
    delimiter: ',',
    header: true,
    columns: [
      { key: 'id', header: 'ID' },
      { key: 'original_url', header: 'Original URL' },
      { key: 'short_url', header: 'Short URL' },
      { key: 'access_count', header: 'Access Count' },
      { key: 'created_at', header: 'Created At' },
    ],
  });

  const uploadToStorageStream = new PassThrough();

  const convertToCSVPipeline = pipeline(
    cursor,
    new Transform({
      objectMode: true,
      transform(chunks: unknown[], encoding, callback) {
        for (const chunk of chunks) {
          this.push(chunk);
        }

        callback();
      },
    }),
    csv,
    uploadToStorageStream
  );

  const uploadToStorage = uploadFileToStorage({
    contentType: 'text/csv',
    fileName: `links-report-${new Date().toISOString()}.csv`,
    folder: 'downloads',
    contentStream: uploadToStorageStream,
  });

  const [{ url }] = await Promise.all([uploadToStorage, convertToCSVPipeline]);

  return makeRight({ reportUrl: url });
}
