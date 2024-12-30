const { youtube, sampleVideoId } = require("./youtube");

async function getVideoById(videoId) {
  try {
    const response = await youtube.videos.list({
      part: "snippet,contentDetails,statistics",
      id: videoId,
    });

    if (response.data.items.length > 0) {
      const video = response.data.items[0];
      //   console.log(`Title: ${video.snippet.title}`);
      //   console.log(`Description: ${video.snippet.description}`);
      //   console.log(`Views: ${video.statistics.viewCount}`);

      return video;
    } else {
      console.log("No video found with that ID.");
    }
  } catch (error) {
    console.error("Error fetching video:", error);
  }
}

getVideoById(sampleVideoId).then((video) => {
  console.log("VIDEO", video);
});
