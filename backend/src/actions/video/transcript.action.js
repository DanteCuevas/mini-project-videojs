'use strict';

require('dotenv').config();
const Video = require('../../models/Video');
const { FindLatestVideoAction } = require('./findLatest.action');
const { AssemblyAI } = require('assemblyai');
const client = new AssemblyAI({
	apiKey: process.env.AssemblyAI_apiKey
});
const request = require('request');
const AWS = require('aws-sdk');
const polly = new AWS.Polly({
	region: 'us-east-1',
	accessKeyId: process.env.AWS_S3_accessKeyId,
	secretAccessKey: process.env.AWS_S3_secretAccessKey,
});
const s3 = new AWS.S3({
	accessKeyId: process.env.AWS_S3_accessKeyId,
	secretAccessKey: process.env.AWS_S3_secretAccessKey,
});

class TranScriptVideoAction {
	static async run() {
		const video = await FindLatestVideoAction.run();
		const config = {
			audio_url: video.audio
		}
		const transcript = await client.transcripts.create(config)
		const translateText = await this.translateText(transcript.text);
		const audioStream = await this.textToSpeechStream(translateText)
		const uploadedMp3 = await s3.upload({
			Bucket: process.env.AWS_S3_bucket,
			Key: `${video._id}-es.mp3`,
			Body: audioStream,
			ContentType: 'audio/mp3'
		}).promise()
		const update = {
			audioES: uploadedMp3.Location,
			text: transcript.text,
			textES: translateText
		}
		await Video.updateOne({ _id: video._id }, update);
		
		return video;
	}

	static async translateText(text) {
		const options = {
			'method': 'POST',
			'url': process.env.DeepL_url,
			'headers': {
				'Authorization': `DeepL-Auth-Key ${process.env.DeepL_auth_key}`,
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			form: {
				'text': text,
				'target_lang': 'ES'
			}
		};

		return new Promise((resolve, reject) => {
			request(options, (error, response, body) => {
				if (error) {
					reject(error);
				} else {
					const body = JSON.parse(response.body);
					resolve(body.translations[0].text)
				};
			});
		});
	}

	static async textToSpeechStream(text) {
		const params = {
			Text: text,
			OutputFormat: 'mp3',
			VoiceId: 'Penelope'
		}
		return new Promise((resolve, reject) => {
			polly.synthesizeSpeech(params, (err, data) => {
				if (err) {
					reject(err)
				} else {
					resolve(data.AudioStream)
				}
			});
		});
	}
}

module.exports = {
	TranScriptVideoAction
};
