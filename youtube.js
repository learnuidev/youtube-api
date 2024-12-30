require("dotenv").config();
const { google } = require("googleapis");

const googleApiKey = process.env.YOUTUBE_API;

// 1. Create a YouTube API client
const youtube = google.youtube({
  version: "v3",
  auth: googleApiKey,
});

const sampleVideoId = "2JJaCwMkC00";
// const sampleVideoId = "_WbHb8-c3-U";

module.exports = {
  youtube,
  googleApiKey,
  sampleVideoId,
};
