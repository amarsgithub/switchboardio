import { handleChatStream } from '@/src/backend/api/chat';

export async function POST(req: Request) {
  return handleChatStream(req);
}
