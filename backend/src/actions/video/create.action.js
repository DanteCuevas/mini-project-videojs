'use strict';

require('dotenv').config();
const Video = require('../../models/Video');
const https = require('https');
const path = require("path");
const fs = require('fs');
const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegInstaller.path);
const extractFrame = require('ffmpeg-extract-frame')
const VideoLib = require('node-video-lib');
const AWS = require("aws-sdk");
const s3 = new AWS.S3({
	accessKeyId: process.env.AWS_S3_accessKeyId,
	secretAccessKey: process.env.AWS_S3_secretAccessKey,
});

class CreateVideoAction {
	static async run(data) {
		const video = await Video.create(data);
		const locationMp4 = path.resolve(`./${video._id}.mp4`);
		const locationMp3 = path.resolve(`./${video._id}.mp3`);
		const locationJpg = path.resolve(`./${video._id}.jpg`);
		await this.pDownload(video.link, locationMp4);

		const metada = await this.metadaVideo(locationMp4)
		await extractFrame({
			input: locationMp4,
			output: locationJpg,
			offset: 0 // seek offset in milliseconds
		});

		const blobImg = fs.readFileSync(locationJpg)
		const uploadedImage = await s3.upload({
			Bucket: process.env.AWS_S3_bucket,
			Key: `${video._id}.jpg`,
			Body: blobImg,
			ContentType: 'image/jpeg'
		}).promise()

		await this.getShortAudio(locationMp4, locationMp3)
		const blob = fs.readFileSync(locationMp3)
		const uploadedMp3 = await s3.upload({
			Bucket: process.env.AWS_S3_bucket,
			Key: `${video._id}.mp3`,
			Body: blob,
			ContentType: 'audio/mp3'
		}).promise()

		const update = {
			duration: metada.relativeDuration(),
			resolution: metada.resolution(),
			image: uploadedImage.Location,
			audio: uploadedMp3.Location,
		}
		await Video.updateOne({ _id: video._id }, update);
		
		return video;
	}

	static pDownload(url, dest) {
		let file = fs.createWriteStream(dest);
		return new Promise((resolve, reject) => {
			let responseSent = false;
			https.get(url, response => {
				response.pipe(file);
				file.on('finish', () =>{
					file.close(() => {
						if(responseSent)  return;
						responseSent = true;
						resolve();
					});
				});
			}).on('error', err => {
				if(responseSent)  return;
				responseSent = true;
				reject(err);
			});
		});
	}

	static metadaVideo(location) {
		return new Promise((resolve, reject) => {
			fs.open(location, 'r', (err, fd) => {
				try {
					let movie = VideoLib.MovieParser.parse(fd);
					resolve(movie);
				} catch (error) {
					reject(error);
				} finally {
					fs.closeSync(fd);
				}
			});
		});
	}

	static getShortAudio(locationMp4, locationMp3) {
		return new Promise((resolve, reject) => {
			ffmpeg(locationMp4)
			.output(locationMp3)
			.setStartTime(30)
			.setDuration(15)
			.on('end', async () => {
				resolve(locationMp3);
			}).on('error', (err) => {
				reject(error);
			}).run();
		});
	}
}

module.exports = {
	CreateVideoAction
};
