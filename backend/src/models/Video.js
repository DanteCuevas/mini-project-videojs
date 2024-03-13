'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const videoSchema = new mongoose.Schema({
	link: { type: String, required: true },
	duration: { type: Number},
	resolution: { type: String },
	audio: { type: String },
	audioES: { type: String },
	image: { type: String },
	text: { type: String },
	textES: { type: String }
}, { timestamps: true, versionKey: false });

module.exports = mongoose.models.Video || mongoose.model('Video', videoSchema);
