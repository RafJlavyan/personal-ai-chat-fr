import axios from "axios";

const API_URL = "http://localhost:3001/api/chat";

export async function sendMessage(message: string): Promise<string> {
  const response = await axios.post(API_URL, { message });
  return response.data.reply;
}
