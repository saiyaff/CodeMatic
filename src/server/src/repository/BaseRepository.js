"use strict";

/**
 * Base class for repository pattern using Mongoose
 */
export default class BaseRepository {
  /**
   * @param {object} config - App config
   * @param {object} constants - App constants
   * @param {object} mongoose - Mongoose instance
   * @param {string} modelName - Unique model name (e.g., 'Chat')
   * @param {object} schemaDefinition - Mongoose schema definition object
   * @param {string} collectionName - Collection name in MongoDB
   */
  constructor(
    config,
    constants,
    mongoose,
    modelName,
    schemaDefinition,
    collectionName
  ) {
    this.config = config;
    this.constants = constants;
    this.mongoose = mongoose;

    const schema = new mongoose.Schema(schemaDefinition, {
      collection: collectionName,
    });

    this.Model = mongoose.model(modelName, schema);
  }

  async _insert(data) {
    console.log(data)
    try {
      return await this.Model.create(data);
    } catch (err) {
      console.error("[Insert Error]", err);
      throw err;
    }
  }

  async _findById(id, projection = null, options = {}) {
    try {
      return await this.Model.findById(id, projection, options).lean();
    } catch (err) {
      console.error("[FindById Error]", err);
      throw err;
    }
  }

  async _updateOne(query, updateDoc, options = {}) {
    try {
      return await this.Model.findOneAndUpdate(query, updateDoc, {
        new: true,
        ...options,
      }).lean();
    } catch (err) {
      console.error("[Update Error]", err);
      throw err;
    }
  }

  async _deleteOne(query) {
    try {
      return await this.Model.deleteOne(query);
    } catch (err) {
      console.error("[Delete Error]", err);
      throw err;
    }
  }

  async _getAll(projection = null, options = {}) {
    try {
      return await this.Model.find({}, projection, options).lean();
    } catch (err) {
      console.error("[GetAll Error]", err);
      throw err;
    }
  }
}
