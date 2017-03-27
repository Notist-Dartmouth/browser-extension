# Notist Chrome-Extension
![](https://circleci.com/gh/Notist/browser-extension.svg?style=shield&circle-token=4cd817732842cf4b33de7affe2fc62e1505e02eb) [![Test Coverage](https://codeclimate.com/repos/58bd6fc2a5873a0270003649/badges/5ea1d739bf6a3877e817/coverage.svg)](https://codeclimate.com/repos/58bd6fc2a5873a0270003649/coverage) [![Code Climate](https://codeclimate.com/repos/58bd6fc2a5873a0270003649/badges/5ea1d739bf6a3877e817/gpa.svg)](https://codeclimate.com/repos/58bd6fc2a5873a0270003649/feed)

![notistextension](https://cloud.githubusercontent.com/assets/6070087/24174007/b9fa9122-0e4b-11e7-8ae7-950dab2fef5f.gif)
## To run with connection to local backend server (localhost:3000):
* first, start the notist backend server as you normally do
* login at localhost:3000/login
* then run 'gulp dev' or 'gulp watch' (for hot loading)
* go to chrome://extensions -> 'load unpacked extension' -> load the newly created `dist` directory

## To run with connection to production backend server (notist.herokuapp.com):
* login at notist.herokuapp.com/login
* 'gulp prod'
* load the unpacked extension ('dist' directory)
