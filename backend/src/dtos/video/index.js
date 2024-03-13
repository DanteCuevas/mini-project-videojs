'use strict';

class VideoDTO {

	static create(body) {
		const dto = {
			link: body.link
		};
		return dto;
	}
}

module.exports = {
	VideoDTO
};
