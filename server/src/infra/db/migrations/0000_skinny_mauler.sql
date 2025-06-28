CREATE TABLE "links" (
	"id" text PRIMARY KEY NOT NULL,
	"remote_key" text NOT NULL,
	"short_url" text NOT NULL,
	"access_count" text DEFAULT '0' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "links_short_url_unique" UNIQUE("short_url")
);
