"use strict";

export default class ChatService {
  constructor({ config, constants, llmService, chatRepository }) {
    this.config = config;
    this.constants = constants;
    this.llmService = llmService;
    this.chatRepository = chatRepository;
  }

  async createChat(chatInfo) {
    try {
      return await this.chatRepository.createChat(chatInfo);
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  async sendMessage(chatId, userMessage) {
    const chat = await this.chatRepository.getChatHistory(chatId);
    if (!chat) throw new Error("Chat not found");

    if (!Array.isArray(chat.messages)) {
      chat.messages = [];
    }

    chat.messages.push({
      role: "user",
      content: userMessage,
      timestamp: new Date(),
    });

    const prompt =
      chat.messages
        .map(
          (msg) =>
            `${msg.role === "user" ? "User" : "Assistant"}: ${msg.content}`
        )
        .join("\n") + "\nAssistant:";

    const llmReply = await this.llmService.generateCodeResponse(prompt);

    chat.messages.push({
      role: "assistant",
      content: llmReply,
      timestamp: new Date(),
    });

    await this.chatRepository.updateChat(chatId, {
      "messages": chat.messages,
    });

    return llmReply;
  }

  async getChatHistory(chatId) {
    try {
      return await this.chatRepository.getChatHistory(chatId);
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  async updateChat(chatId, chatHistory) {
    try {
      return await this.chatRepository.updateChat(chatId, chatHistory);
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  async removeChat(chatId) {
    try {
      return await this.chatRepository.removeChat(chatId);
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  async getAllChats() {
    try {
      return await this.chatRepository.getAllChats();
    } catch (err) {
      console.error(err);
      return [];
    }
  }
}
