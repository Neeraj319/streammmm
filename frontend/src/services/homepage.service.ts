import { axiosInstance } from "../axios.config";
import { Stream } from "../interfaces/stream.interface";

export async function getStreams(): Promise<Stream[]> {
  try {
    const response = await axiosInstance.get("/videos");
    console.log(response.data);
    return response.data;
  } catch (error) {
    return [];
  }
}
