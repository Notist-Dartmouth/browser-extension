# Notist Chrome-Extension
![](https://circleci.com/gh/Notist/browser-extension.svg?style=shield&circle-token=4cd817732842cf4b33de7affe2fc62e1505e02eb)

![chromeextension4-10](https://cloud.githubusercontent.com/assets/6070087/24935775/18af2d52-1ef2-11e7-9a4b-43be02ce99be.png)

## To run with connection to local backend server (localhost:3000):
* first, start the notist backend server as you normally do
* login at localhost:3000/login
* then run 'gulp dev' or 'gulp watch' (for hot loading)
* go to chrome://extensions -> 'load unpacked extension' -> load the newly created `dist` directory

## To run with connection to production backend server (notist.herokuapp.com):
* login at notist.herokuapp.com/login
* 'gulp prod'
* load the unpacked extension ('dist' directory)
