-- CreateEnum
CREATE TYPE "StreamStatus" AS ENUM ('CREATED', 'RUNNING', 'ENDED');

-- AlterTable
ALTER TABLE "Video" ADD COLUMN     "status" "StreamStatus" NOT NULL DEFAULT 'CREATED';
