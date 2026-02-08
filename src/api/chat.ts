import axios from "axios";

const API_URL =
  "https://site--personal-ai-chat--qm97qxrrfmwg.code.run/api/chat";

export async function sendMessage(message: string): Promise<string> {
  const response = await axios.post(API_URL, { message });
  return response.data.reply;
}
