const { youtube, sampleVideoId } = require("./youtube");

// Function to fetch comments by video ID
async function listComments({
  videoId,
  results = {
    comments: [],
    nextPageToken: null,
  },
}) {
  try {
    const response = await youtube.commentThreads.list({
      part: "snippet",
      pageToken: results?.nextPageToken,
      videoId,
      maxResults: 100, // Adjust as needed (max is 100)
    });

    // return response;

    const nextPageToken = response.data.nextPageToken;

    const comments2 = response.data.items;

    // console.log("COMMENTS 2", JSON.stringify(comments2, null, 4));
    const comments = response.data.items
      .map((item) => {
        const {
          authorDisplayName,
          textDisplay,
          publishedAt,
          updatedAt,
          likeCount,
        } = item.snippet.topLevelComment.snippet;
        return {
          author: authorDisplayName,
          text: textDisplay,
          publishedAt: publishedAt,
          updatedAt: updatedAt,
          likeCount,
        };
      })
      .sort((a, b) => b?.likeCount - a?.likeCount);

    const resp = {
      comments: results.comments?.concat(comments),
      nextPageToken: nextPageToken,
    };

    if (resp?.nextPageToken) {
      return listComments({
        videoId,
        results: {
          ...results,
          comments: resp?.comments,
          nextPageToken: resp?.nextPageToken,
        },
      });
    }

    return {
      ...resp,
      comments: resp?.comments?.sort((a, b) => b?.likeCount - a?.likeCount),
    };

    console.log(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
  }
}

// Replace with your video ID

listComments({
  videoId: sampleVideoId,
  // pageToken:
  //   "Z2V0X25ld2VzdF9maXJzdC0tQ2dnSWdBUVZGN2ZST0JJRkNJY2dHQUFTQlFpb0lCZ0FFZ1VJaUNBWUFCSUZDSWtnR0FBU0JRaWRJQmdCSWc0S0RBakQ0YUM3QmhDWXB0aWdBUQ==",
}).then((comments) => {
  console.log(
    "comments",
    JSON.stringify(comments?.comments?.slice(0, 5), null, 4)
  );
});
