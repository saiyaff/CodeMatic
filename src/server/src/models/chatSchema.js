import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
  participants: [String],
  topic: String,
  messages: [
    {
      role: { type: String, enum: ['user', 'assistant'] },
      content: String,
      timestamp: { type: Date, default: Date.now }
    }
  ],
  createdAt: { type: Date, default: Date.now }
});

export default chatSchema;
