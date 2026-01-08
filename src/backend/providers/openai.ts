import { ChatRequest, ChatChunk } from '../../shared/types';
import { BaseProvider } from './base';

export class OpenAIProvider extends BaseProvider {
  id = 'openai';
  displayName = 'OpenAI';

  async *streamChat(request: ChatRequest): AsyncIterable<ChatChunk> {
    // In a real implementation, this would call the OpenAI API
    // const response = await openai.chat.completions.create({ ... })
    yield* this.mockStream(`[OpenAI Mock] Response to: ${request.messages[request.messages.length - 1].content}`);
  }
}
