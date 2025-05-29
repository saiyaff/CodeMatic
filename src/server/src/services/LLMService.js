'use strict';

import axios from 'axios';

export default class LLMService {
  constructor(config) {
    this.config = config;
  }

  /**
   * Sends a coding question prompt to the local LLM and returns the answer.
   * This example uses a CLI command for local LLM inference (adjust per your setup).
   *
   * @param {string} prompt - coding question / query
   * @returns {Promise<string>} - LLM response text
   */

  async generateCodeResponse(prompt) {
    try {
      const response = await axios.post('http://localhost:11434/api/generate', {
        model: 'deepseek-coder',
        prompt: prompt,
        stream: false
      });
      return response.data.response.trim();
    } catch (error) {
      console.error('LLM API error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.error || 'Failed to generate response');
    }
  }
}
