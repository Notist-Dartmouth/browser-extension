# Notist Chrome-Extension
![](https://circleci.com/gh/Notist/browser-extension.svg?style=shield&circle-token=4cd817732842cf4b33de7affe2fc62e1505e02eb)

![chromeextension4-10](https://cloud.githubusercontent.com/assets/6070087/24935775/18af2d52-1ef2-11e7-9a4b-43be02ce99be.png)

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
