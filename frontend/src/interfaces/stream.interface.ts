enum StreamStatus {
  CREATED = "CREATED",
  RUNNING = "RUNNING",
  ENDED = "ENDED",
}

export interface Stream {
  id: number;
  url: string;
  title: string;
  status: StreamStatus;
  channelId: number;
}
