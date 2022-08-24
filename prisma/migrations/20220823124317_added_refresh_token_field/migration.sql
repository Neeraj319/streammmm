/*
  Warnings:

  - You are about to drop the column `tokenVersion` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "tokenVersion",
ADD COLUMN     "refreshToken" VARCHAR(200);
