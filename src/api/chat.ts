import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + "/api/chat";

export async function sendMessage(message: string): Promise<string> {
  const response = await axios.post(API_URL, { message });
  return response.data.reply;
}
