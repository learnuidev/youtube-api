const { youtube } = require("./youtube");

const listVideos = ({ query }) => {
  let params = {
    part: "snippet",
    // part: "snippet,statistics",
    type: "video",
    order: "viewCount",
    maxResults: 10, // Adjust the number of results as needed
  };

  if (query) {
    params.q = query;
  }

  return youtube.search.list(params).then((items) => {
    console.log("ITEMS: ", items);

    return items.data.items;
  });
};

listVideos({ query: "hello world" }).then((resp) => {
  console.log("VIDEOS", resp);
});
