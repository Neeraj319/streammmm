-- CreateTable
CREATE TABLE "Video" (
    "id" SERIAL NOT NULL,
    "url" VARCHAR(20) NOT NULL,
    "channelId" INTEGER NOT NULL,
    "file_url" VARCHAR(200) NOT NULL,

    CONSTRAINT "Video_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Video" ADD CONSTRAINT "Video_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "Channel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
