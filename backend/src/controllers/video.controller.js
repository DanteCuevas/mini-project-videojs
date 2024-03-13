const { CreateVideoRequest } = require('../requests/video/create');
const { VideoDTO } = require('../dtos/video');
const { FindLatestVideoAction } = require('../actions/video/findLatest.action')
const { CreateVideoAction } = require('../actions/video/create.action');
const { TranScriptVideoAction } = require('../actions/video/transcript.action');
const { createWorker } = require('tesseract.js');
const path = require("path");

const get = async (req, res) => {
  try {
    const video = await FindLatestVideoAction.run();

    return res.json(video)
  } catch (error) {
    return res.status(500).end()
  }
}

const ocr = async (req, res) => {
  try {
    const video = await FindLatestVideoAction.run();
		const worker = await createWorker('eng');
  	const ret = await worker.recognize(video.image);
  	await worker.terminate();

    return res.json({video, textImg: ret.data.text})
  } catch (error) {
    return res.status(500).end()
  }
}

const post = async (req, res) => {
  try {
    const data = req.body;
		await CreateVideoRequest.validate(data);
		const video = await CreateVideoAction.run(VideoDTO.create(data));

    return res.json(video)
  } catch (error) {
    return res.status(500).end()
  }
}

const transcript = async (req, res) => {
  try {
    const video = await TranScriptVideoAction.run();

    return res.json(video)
  } catch (error) {
    return res.status(500).end()
  }
}


module.exports = {
  get,
  ocr,
  post,
  transcript
}
