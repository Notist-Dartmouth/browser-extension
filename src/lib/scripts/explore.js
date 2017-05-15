import _ from 'underscore';
// import FB from 'fb';

function done() {
  console.log('done');
  console.log(arguments);
  initializeExplore(arguments[0]);
}

function progress() {
  // TODO implement some type of progress bar
  console.log(arguments);
}

function onClick(ev) {
  // getAllFriendScores2(done, progress);
  testExplore();
}

window.addEventListener('load', (event) => {
  document.querySelector('button').addEventListener('click', onClick);
}, false);

function initializeExplore(friends) {
  // compute user's explore number
  let total = 0;

  const scores = [];
  const page_scores = {};
  const page_likes = {};

  // for each friend, look at their score and add to total count
  _.each(friends, (user) => {
    if (!isNaN(user.score)) {
      total += user.score;
      scores.push(user.score);
      _.each(user.pages, (page) => { // for each media page a friend has liked (non-politician)
        if (page_scores[page.page_id]) { // compute score of that page in context of this bubble
          page_scores[page.page_id] = ((page_scores[page.page_id] * page_likes[page.page_id]) + user.score) / (page_likes[page.page_id] + 1);
          page_likes[page.page_id] = page_likes[page.page_id] + 1;
        } else if (page.page_id in news_dict || page.page_id in fakenews_dict) {
          page_scores[page.page_id] = user.score;
          page_likes[page.page_id] = 1;
        }
      });
    }
  });
  console.log(page_scores);

  const explore_num = total / scores.length;
  console.log('Explore number', explore_num);

  // compute standard deviation
  const squareDiffs = scores.map((value) => {
    const diff = value - explore_num;
    const sqr = diff * diff;
    return sqr;
  });

  const avgSquareDiff = average(squareDiffs);
  const std_dev = Math.sqrt(avgSquareDiff);
  console.log('Standard Deviation', std_dev);

  // find users with score in range of epxlorenum+/-std_dev, return pge Ids
  const factor = std_dev * 2;
  const optimal = ((explore_num + factor) < 2) ? explore_num + factor : (((explore_num - factor) > 0) ? explore_num - factor : 1);
  console.log('Looking for someone with score closest to', optimal);

  let diff = 4;
  let oldcurr,
    curr;
  _.each(page_scores, (page, index) => {
    const newdiff = Math.abs(page - optimal);
    if (newdiff < diff) {
      diff = newdiff;
      oldcurr = curr;
      curr = index;
    }
  });
  console.log(curr);
  console.log(oldcurr);

  updateExploreOnAPI(explore_num, std_dev, curr, oldcurr, optimal);
}

function testExplore() {
  // to test
  const explore_num = 0.3;
  const std_dev = 0.3;
  const optimal = 0.9;
  const curr = '15704546335';
  const oldcurr = '8304333127';
  updateExploreOnAPI(explore_num, std_dev, curr, oldcurr, optimal);
}


function updateExploreOnAPI(explore_num, std_dev, curr, oldcurr, optimal) {
  // make call to API to save user Explore Number and std_dev
  // chrome.runtime.sendMessage({ type: 'USER_EXPLORE_UPDATE', explore_num, std_dev }, response =>
  // console.log(response));

  // make call to our API to make call to FB API to find articles from specific pages
  chrome.runtime.sendMessage({ type: 'ADD_EXPLORE_ARTICLES', pages: [curr, oldcurr], score: optimal }, response =>
  console.log(response));
}

function average(data) {
  const sum = data.reduce((sum, value) => sum + value, 0);
  const avg = sum / data.length;
  return avg;
}
