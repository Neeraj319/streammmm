-- CreateEnum
CREATE TYPE "Status" AS ENUM ('LIVE', 'IDLE');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(20) NOT NULL,
    "passowrd" VARCHAR(200) NOT NULL,
    "first_name" VARCHAR(20),
    "last_name" VARCHAR(20),
    "profile_picture" VARCHAR(200),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Channel" (
    "id" SERIAL NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'IDLE',
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Channel_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Channel_userId_key" ON "Channel"("userId");

-- AddForeignKey
ALTER TABLE "Channel" ADD CONSTRAINT "Channel_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
