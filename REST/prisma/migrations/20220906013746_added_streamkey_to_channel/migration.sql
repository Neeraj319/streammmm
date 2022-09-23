/*
  Warnings:

  - A unique constraint covering the columns `[streamKey]` on the table `Channel` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `streamKey` to the `Channel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Channel" ADD COLUMN     "streamKey" VARCHAR(200) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Channel_streamKey_key" ON "Channel"("streamKey");
