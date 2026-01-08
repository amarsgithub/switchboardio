import { ChatRequest, ChatChunk } from '../../shared/types';
import { BaseProvider } from './base';

export class AnthropicProvider extends BaseProvider {
  id = 'anthropic';
  displayName = 'Anthropic';

  async *streamChat(request: ChatRequest): AsyncIterable<ChatChunk> {
    yield* this.mockStream(`[Anthropic Mock] Response to: ${request.messages[request.messages.length - 1].content}`);
  }
}
