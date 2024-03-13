'use strict';

const Joi = require('joi');

const rulesJoi = Joi.object({
	link: Joi.string()
		.required()
});

class CreateVideoRequest {
	static async validate(body) {
		await rulesJoi.validateAsync(body);
	}
}

module.exports = {
	CreateVideoRequest
};
