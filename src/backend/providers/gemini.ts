import { ChatRequest, ChatChunk } from '../../shared/types';
import { BaseProvider } from './base';

export class GeminiProvider extends BaseProvider {
  id = 'gemini';
  displayName = 'Google Gemini';

  async *streamChat(request: ChatRequest): AsyncIterable<ChatChunk> {
    yield* this.mockStream(`[Gemini Mock] Response to: ${request.messages[request.messages.length - 1].content}`);
  }
}
