require("dotenv").config();
const { google } = require("googleapis");

const googleApiKey = process.env.YOUTUBE_API;

// 1. Create a YouTube API client
const youtube = google.youtube({
  version: "v3",
  auth: googleApiKey,
});

module.exports = {
  youtube,
};
