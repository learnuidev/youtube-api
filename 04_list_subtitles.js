const { youtube, sampleVideoId } = require("./youtube");

async function getSubtitles(videoId) {
  try {
    const captionsResponse = await youtube.captions.list({
      part: "snippet",
      videoId: videoId,
    });

    if (!captionsResponse.data.items.length) {
      return res
        .status(404)
        .json({ success: false, message: "No captions found for this video." });
    }

    // Get the ID of the first caption track
    const captionId = captionsResponse.data.items[0].id;

    // return captionId;

    // Download the transcript text of the caption track
    const transcriptResponse = await youtube.captions.download({
      id: captionId,
      tfmt: "vtt", // Specify format (e.g., WebVTT)
    });

    const transcriptText = transcriptResponse.data; // This contains the caption text

    return transcriptText;
  } catch (error) {
    console.error("Error fetching video:", error);
  }
}

getSubtitles(sampleVideoId).then((video) => {
  console.log("VIDEO", video);
});
