# Notist Chrome-Extension
![](https://circleci.com/gh/Notist/browser-extension.svg?style=shield&circle-token=4cd817732842cf4b33de7affe2fc62e1505e02eb)

## To run with connection to local api server (localhost:3000) and local frontend server (localhost:5000):
* start the notist api - go to the api repo and run NODE_ENV=development npm run dev
* start the notist frontend server - go to front-end repo and run npm start
* login at localhost:5000/login
* then run 'gulp dev' or 'gulp watch' (for hot loading)
* go to chrome://extensions -> 'load unpacked extension' -> load the newly created `dist` directory

## To run with connection to production api server (notist.herokuapp.com) and frontend server (notist-frontend.herokuapp.com):
* login at notist-frontend.herokuapp.com/login
* 'gulp prod'
* go to chrome://extensions
* load the unpacked extension ('dist' directory)


## To parse facebook:

after running `gulp X`:

- copy `index.html` in `/src/index.html` into `dist/index.html`

- navigate to `chrome-extension://id/index.html` but replace `id` with the actual one for notist from `chrome://extensions/`

- be logged into facebook on the browser (just need cookie, facebook doesn't need to be open)

- press the button and check out the console log
