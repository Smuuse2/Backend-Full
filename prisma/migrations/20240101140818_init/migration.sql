-- CreateTable
CREATE TABLE "post" (
    "id" SERIAL NOT NULL,
    "CreateAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "Title" TEXT NOT NULL,
    "Content" TEXT NOT NULL,
    "Address" TEXT NOT NULL,
    "Puplished" BOOLEAN NOT NULL,

    CONSTRAINT "post_pkey" PRIMARY KEY ("id")
);
