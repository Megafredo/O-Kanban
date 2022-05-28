BEGIN;

DROP TABLE IF EXISTS "user", "list", "card", "tag", "card_has_tag";

CREATE TABLE IF NOT EXISTS "user" (

    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "avatar" TEXT NULL,
    "firstname" TEXT NULL,
    "lastname" TEXT NULL,
    "email" TEXT NOT NULL UNIQUE,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ

);

CREATE TABLE IF NOT EXISTS "list" (

    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "title" TEXT NOT NULL,
    "order" SERIAL,
    "description" TEXT NULL,
    "user_id" INTEGER NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ

);

CREATE TABLE IF NOT EXISTS "card" (

    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "title" TEXT NOT NULL,
    "order" SERIAL,
    "color" TEXT NULL,
    "description" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
    "list_id" INTEGER NOT NULL REFERENCES "list"("id") ON DELETE CASCADE,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ

);

CREATE TABLE IF NOT EXISTS "tag" (

    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL,
    "color" TEXT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ

);
CREATE TABLE IF NOT EXISTS "card_has_tag" (

    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "card_id" INTEGER NOT NULL REFERENCES "card"("id") ON DELETE CASCADE,
    "tag_id" INTEGER NOT NULL REFERENCES "tag"("id") ON DELETE CASCADE,
    UNIQUE("card_id", "tag_id")
);

COMMIT;