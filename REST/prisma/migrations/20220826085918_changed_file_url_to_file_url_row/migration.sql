/*
  Warnings:

  - You are about to drop the column `file_url` on the `Video` table. All the data in the column will be lost.
  - Added the required column `fileUrl` to the `Video` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Video" DROP COLUMN "file_url",
ADD COLUMN     "fileUrl" VARCHAR(200) NOT NULL;
