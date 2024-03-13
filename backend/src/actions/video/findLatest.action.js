'use strict';

const Video = require('../../models/Video');

class FindLatestVideoAction {
	static run = async () => {
		const video = await Video.findOne({}).sort({ createdAt: -1 });
		return video;
	}
}

module.exports = {
	FindLatestVideoAction
};
