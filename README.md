# Notist Chrome-Extension
![notistextension](https://cloud.githubusercontent.com/assets/6070087/23582511/fb6c300c-00f9-11e7-9b5e-4dd4e60a6cbf.gif)
## To run with connection to local backend server (localhost:3000):
* first, start the notist backend server as you normally do
* login at localhost:3000/login
* then run 'gulp dev' or 'gulp watch' (for hot loading)
* go to chrome://extensions -> 'load unpacked extension' -> load the newly created `dist` directory

## To run with connection to production backend server (notist.herokuapp.com):
* login at notist.herokuapp.com/login
* 'gulp prod'
* load the unpacked extension ('dist' directory)
