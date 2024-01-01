/*
  Warnings:

  - You are about to drop the column `Address` on the `post` table. All the data in the column will be lost.
  - You are about to drop the column `Content` on the `post` table. All the data in the column will be lost.
  - You are about to drop the column `Puplished` on the `post` table. All the data in the column will be lost.
  - Added the required column `userId` to the `post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "post" DROP COLUMN "Address",
DROP COLUMN "Content",
DROP COLUMN "Puplished",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "userName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- AddForeignKey
ALTER TABLE "post" ADD CONSTRAINT "post_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
