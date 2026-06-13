CREATE TABLE "companies" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "companies_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "financial_statements" (
    "id" SERIAL NOT NULL,
    "company_id" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "financial_statements_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "statement_files" (
    "id" SERIAL NOT NULL,
    "statement_id" INTEGER NOT NULL,
    "original_name" VARCHAR(255) NOT NULL,
    "stored_name" VARCHAR(255) NOT NULL,
    "file_path" TEXT NOT NULL,
    "file_type" VARCHAR(50),
    "file_size" BIGINT,
    "uploaded_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "statement_files_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "financial_statements_company_id_year_key"
ON "financial_statements"("company_id", "year");

ALTER TABLE "financial_statements"
ADD CONSTRAINT "financial_statements_company_id_fkey"
FOREIGN KEY ("company_id") REFERENCES "companies"("id")
ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "statement_files"
ADD CONSTRAINT "statement_files_statement_id_fkey"
FOREIGN KEY ("statement_id") REFERENCES "financial_statements"("id")
ON DELETE CASCADE ON UPDATE CASCADE;

INSERT INTO "companies" ("name") VALUES
('Newoon Business Services'),
('Gulf Horizon Trading'),
('Blue Axis Consulting'),
('Palm Bridge Holdings'),
('Atlas Compliance Group');
