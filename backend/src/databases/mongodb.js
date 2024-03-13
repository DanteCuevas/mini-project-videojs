'use strict';

const mongoose = require('mongoose');
require('dotenv').config();

class SingletonMongoDB {
	static instance;
	static async getInstance () {
	  if (!SingletonMongoDB.instance) {
		const credentials = `${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}`;
		const host = `${process.env.MONGO_HOST}:${process.env.MONGO_PORT}`;
		const mongoDB = process.env.MONGO_DB;
		let uri = `mongodb://${credentials}@${host}/${mongoDB}`;
		uri = process.env.MONGO_URI || uri;
		SingletonMongoDB.instance = await mongoose.connect(uri);
	  }
	  return SingletonMongoDB.instance;
	}
  }

module.exports = {
	SingletonMongoDB
};
