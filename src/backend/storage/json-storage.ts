import fs from 'fs/promises';
import path from 'path';
import { Conversation, PromptTemplate } from '../../shared/types';
import { Repository } from './repository';

export class JSONRepository implements Repository {
  private dataDir: string;
  private conversationsFile: string;
  private templatesFile: string;

  constructor(dataDir: string = 'data') {
    this.dataDir = dataDir;
    this.conversationsFile = path.join(dataDir, 'conversations.json');
    this.templatesFile = path.join(dataDir, 'templates.json');
  }

  private async ensureDir() {
    try {
      await fs.mkdir(this.dataDir, { recursive: true });
    } catch (e) {}
  }

  private async read<T>(file: string): Promise<T[]> {
    await this.ensureDir();
    try {
      const content = await fs.readFile(file, 'utf-8');
      return JSON.parse(content);
    } catch (e) {
      return [];
    }
  }

  private async write<T>(file: string, data: T[]): Promise<void> {
    await this.ensureDir();
    await fs.writeFile(file, JSON.stringify(data, null, 2));
  }

  async getConversations(): Promise<Conversation[]> {
    return this.read<Conversation>(this.conversationsFile);
  }

  async getConversation(id: string): Promise<Conversation | null> {
    const convs = await this.getConversations();
    return convs.find((c) => c.id === id) || null;
  }

  async saveConversation(conversation: Conversation): Promise<void> {
    const convs = await this.getConversations();
    const index = convs.findIndex((c) => c.id === conversation.id);
    if (index >= 0) {
      convs[index] = conversation;
    } else {
      convs.push(conversation);
    }
    await this.write(this.conversationsFile, convs);
  }

  async deleteConversation(id: string): Promise<void> {
    const convs = await this.getConversations();
    await this.write(this.conversationsFile, convs.filter((c) => c.id !== id));
  }

  async getTemplates(): Promise<PromptTemplate[]> {
    return this.read<PromptTemplate>(this.templatesFile);
  }

  async saveTemplate(template: PromptTemplate): Promise<void> {
    const templates = await this.getTemplates();
    const index = templates.findIndex((t) => t.id === template.id);
    if (index >= 0) {
      templates[index] = template;
    } else {
      templates.push(template);
    }
    await this.write(this.templatesFile, templates);
  }

  async deleteTemplate(id: string): Promise<void> {
    const templates = await this.getTemplates();
    await this.write(this.templatesFile, templates.filter((t) => t.id !== id));
  }
}
