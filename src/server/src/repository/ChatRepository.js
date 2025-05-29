"use strict";

import BaseRepository from "./BaseRepository.js";
import chatSchema from "../models/chatSchema.js";

export default class ChatRepository extends BaseRepository {
  constructor({ config, constants, mongoose }) {
    super(config, constants, mongoose, 'chat', chatSchema, config.dataModel.collection.chat);
  }

  async createChat(chatInfo) {
    try {
      return await this._insert(chatInfo);
    } catch (err) {
      console.error("[ChatRepository:createChat]", err);
      return {};
    }
  }

  async getChatHistory(chatId) {
    try {
      return await this._findById(chatId);
    } catch (err) {
      console.error("[ChatRepository:getChatHistory]", err);
      return {};
    }
  }

  async updateChat(chatId, updatedChatData) {
    try {
      return await this._updateOne({ _id: chatId }, updatedChatData);
    } catch (err) {
      console.error("[ChatRepository:updateChat]", err);
      return {};
    }
  }

  async removeChat(chatId) {
    try {
      return await this._deleteOne({ _id: chatId });
    } catch (err) {
      console.error("[ChatRepository:removeChat]", err);
      return {};
    }
  }

  async getAllChats() {
    try {
      return await this._getAll(null, {
        sort: { createdAt: -1 },
      });
    } catch (err) {
      console.error("[ChatRepository:getAllChats]", err);
      return [];
    }
  }
}
