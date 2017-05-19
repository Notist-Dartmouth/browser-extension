import _ from 'underscore';
import {
  news_dict,
  fakenews_dict,
} from './scoring';
import {
  getAllFriendScores2,
} from './parse';
import {
  updateUserExploreNum,
  postFbPageArticles,
} from './api';

let exploreHost;
// @if ENVIRONMENT='production'
exploreHost = 'https://notist.io/explore';
// @endif
// @if ENVIRONMENT='development'
exploreHost = 'http://localhost:5000/explore';
// @endif

export const exploreSetup = () => {
  getAllFriendScores2(politechoDone, politechoProgress);
};

function politechoDone() {
  console.log(arguments);
  const status = initializeExplore(arguments[0]);
  if (status === 'SUCCESS') {
    chrome.tabs.query({ active: true, url: 'http://*/explore*' }, (tabs) => { // active: true, currentWindow: true
      chrome.tabs.sendMessage(tabs[0].id, { type: 'EXPLORE_DONE' });
    });
  }
}

function politechoProgress() {
  console.log('progress', arguments);
}

export const initializeExplore = (friends) => {
  // if no friends then ERROR !
  if (friends.length == 0) {
    return 'ERROR';
  }

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
  if (page_scores.length == 0) {
    return 'ERROR';
  }

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
  console.log('1st match', curr);
  console.log('2nd match', oldcurr);

  return updateExploreOnAPI(explore_num, std_dev, curr, oldcurr, optimal);
};

export const testExplore = (done) => {
  // values to use to test
  const explore_num = 0.3;
  const std_dev = 0.3;
  const optimal = 0.9;
  const curr = '15704546335';
  const oldcurr = '8304333127';

  updateExploreOnAPI(explore_num, std_dev, curr, oldcurr, optimal);
  done();
};


export const updateExploreOnAPI = (explore_num, std_dev, curr, oldcurr, optimal) => {
    // make calls to API to save user Explore Number and std_dev
    // should probably try to get some semblance of a response from these?
  updateUserExploreNum(explore_num, std_dev);
  postFbPageArticles([curr, oldcurr], optimal);

  return 'SUCCESS';
  // chrome.runtime.sendMessage({ type: 'EXPLORE_DONE' });
};

const average = (data) => {
  const sum = data.reduce((sum, value) => sum + value, 0);
  const avg = sum / data.length;
  return avg;
};
