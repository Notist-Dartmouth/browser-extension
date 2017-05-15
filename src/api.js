import 'whatwg-fetch';
import path from 'path';

const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

let apiHost;
// @if ENVIRONMENT='production'
apiHost = 'https://notist.herokuapp.com';
// @endif
// @if ENVIRONMENT='development'
apiHost = 'http://localhost:8080';
// @endif


export function updateUserExploreNum(explore_num, std_dev) {
  fetch(path.join(apiHost, '/api/user/exploreNumber'), {
    method: 'POST',
    credentials: 'include',
    headers,
    body: JSON.stringify({ // TODO: does this work?
      explore_num,
      std_dev,
    }),
  }).then(res => res.json())
  .then((user) => {
    console.log(user);
  });
}

export function postFbPageArticles(pages, score) {
  fetch(path.join(apiHost, '/api/initializeExplore/articles'), {
    method: 'POST',
    credentials: 'include',
    headers,
    body: JSON.stringify({
      pages,
      score,
    }),
  }).then(res => res.json())
  .then((res) => {
    console.log(res);
  });
}
