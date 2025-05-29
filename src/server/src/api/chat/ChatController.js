"use strict";

import { Router } from "express";

/**
 * @swagger
 * tags:
 *   - name: Chat
 *     description: Chat management APIs
 */

export default class ChatController {
  expressRouter = Router();

  constructor({ chatService, constants }) {
    this.chatService = chatService;
    this.constants = constants;

    this.expressRouter.get("/", this.getAllChats);
    this.expressRouter.post("/", this.createChat);
    this.expressRouter.post("/:chatId/message", this.sendMessage);
    this.expressRouter.put("/:chatId", this.updateChat);
    this.expressRouter.get("/:chatId", this.getChatHistory);
    this.expressRouter.delete("/:chatId", this.removeChat);
  }

  getRouter() {
    return this.expressRouter;
  }

  /**
   * @swagger
   * /chat:
   *   get:
   *     tags: [Chat]
   *     summary: Get all chats
   *     description: Returns a list of all chat sessions
   *     responses:
   *       200:
   *         description: List of chats
   *         schema:
   *           type: array
   *           items:
   *             type: object
   *       500:
   *         description: Server error
   */
  getAllChats = async (req, res, next) => {
    try {
      const result = await this.chatService.getAllChats();
      res.status(this.constants.SUCCESS).json(result);
    } catch (err) {
      next(err);
    }
  };

  /**
   * @swagger
   * /chat:
   *   post:
   *     tags: [Chat]
   *     summary: Create a new chat
   *     description: Creates a new chat session with participants and optional topic
   *     consumes:
   *       - application/json
   *     parameters:
   *       - in: body
   *         name: chat
   *         required: true
   *         schema:
   *           type: object
   *           required:
   *             - participants
   *           properties:
   *             participants:
   *               type: array
   *               items:
   *                 type: string
   *               example: ["user1", "user2"]
   *             topic:
   *               type: string
   *               example: "Code generation session"
   *     responses:
   *       200:
   *         description: Chat created successfully
   *         schema:
   *           type: object
   *           properties:
   *             _id:
   *               type: string
   *             participants:
   *               type: array
   *               items:
   *                 type: string
   *             topic:
   *               type: string
   *       500:
   *         description: Server error
   */
  createChat = async (req, res, next) => {
    try {
      const result = await this.chatService.createChat(req.body);
      res.status(this.constants.SUCCESS).json(result);
    } catch (err) {
      next(err);
    }
  };

  /**
   * @swagger
   * /chat/{chatId}/message:
   *   post:
   *     tags: [Chat]
   *     summary: Send a message in a chat
   *     description: Sends a message to a specific chat and returns the LLM response
   *     consumes:
   *       - application/json
   *     parameters:
   *       - in: path
   *         name: chatId
   *         required: true
   *         type: string
   *         description: ID of the chat to send the message to
   *       - in: body
   *         name: message
   *         required: true
   *         schema:
   *           type: object
   *           required:
   *             - message
   *           properties:
   *             message:
   *               type: string
   *               example: "Write a function in JavaScript to reverse a string."
   *     responses:
   *       200:
   *         description: LLM response received successfully
   *         schema:
   *           type: object
   *           properties:
   *             reply:
   *               type: string
   *               example: "Here is the reversed string function in JavaScript..."
   *       400:
   *         description: Bad request (missing message)
   *       500:
   *         description: Server error
   */
  sendMessage = async (req, res, next) => {
    try {
      const { chatId } = req.params;
      const { message } = req.body;
      if (!message) {
        return res.status(400).json({ error: "Message is required" });
      }
      const llmResponse = await this.chatService.sendMessage(chatId, message);
      res.status(200).json({ reply: llmResponse });
    } catch (err) {
      next(err);
    }
  };

  /**
   * @swagger
   * /chat/{chatId}:
   *   put:
   *     tags: [Chat]
   *     summary: Update a chat
   *     description: Updates an existing chat by ID
   *     consumes:
   *       - application/json
   *     parameters:
   *       - in: path
   *         name: chatId
   *         required: true
   *         type: string
   *         description: ID of the chat to update
   *       - in: body
   *         name: chat
   *         required: true
   *         schema:
   *           type: object
   *           properties:
   *             topic:
   *               type: string
   *               example: "Updated topic"
   *             participants:
   *               type: array
   *               items:
   *                 type: string
   *               example: ["user1", "user3"]
   *     responses:
   *       200:
   *         description: Chat updated successfully
   *       404:
   *         description: Chat not found
   *       500:
   *         description: Server error
   */
  updateChat = async (req, res, next) => {
    try {
      const result = await this.chatService.updateChat(
        req.params.chatId,
        req.body
      );
      res.status(this.constants.SUCCESS).json(result);
    } catch (err) {
      next(err);
    }
  };

  /**
   * @swagger
   * /chat/{chatId}:
   *   get:
   *     tags: [Chat]
   *     summary: Get chat history
   *     description: Retrieves chat history by ID
   *     parameters:
   *       - in: path
   *         name: chatId
   *         required: true
   *         type: string
   *         description: ID of the chat
   *     responses:
   *       200:
   *         description: Chat history retrieved successfully
   *         schema:
   *           type: object
   *           properties:
   *             _id:
   *               type: string
   *             participants:
   *               type: array
   *               items:
   *                 type: string
   *             messages:
   *               type: array
   *               items:
   *                 type: object
   *                 properties:
   *                   role:
   *                     type: string
   *                     example: "user"
   *                   content:
   *                     type: string
   *                     example: "What's polymorphism in Java?"
   *                   timestamp:
   *                     type: string
   *                     format: date-time
   *       404:
   *         description: Chat not found
   *       500:
   *         description: Server error
   */
  getChatHistory = async (req, res, next) => {
    try {
      const result = await this.chatService.getChatHistory(req.params.chatId);
      res.status(this.constants.SUCCESS).json(result);
    } catch (err) {
      next(err);
    }
  };

  /**
   * @swagger
   * /chat/{chatId}:
   *   delete:
   *     tags: [Chat]
   *     summary: Delete a chat
   *     description: Deletes a chat by ID
   *     parameters:
   *       - in: path
   *         name: chatId
   *         required: true
   *         type: string
   *         description: ID of the chat
   *     responses:
   *       200:
   *         description: Chat deleted successfully
   *       404:
   *         description: Chat not found
   *       500:
   *         description: Server error
   */
  removeChat = async (req, res, next) => {
    try {
      const result = await this.chatService.removeChat(req.params.chatId);
      res.status(this.constants.SUCCESS).json(result);
    } catch (err) {
      next(err);
    }
  };
}
