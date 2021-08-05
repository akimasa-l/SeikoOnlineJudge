const apiKey = "AIzaSyCdPSh0oLF96YaVxrA_2qhNszC7wd_FtTg";

// Enter the API Discovery Docs that describes the APIs you want to
// access. In this example, we are accessing the People API, so we load
// Discovery Doc found here: https://developers.google.com/people/api/rest/
const discoveryDocs = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];

// Enter a client ID for a web application from the Google API Console:
//   https://console.developers.google.com/apis/credentials?project=_
// In your API Console project, add a JavaScript origin that corresponds
//   to the domain where you will be running the script.
const clientId = "826450531725-7li2vbpd3bpu3b5lr3bpcbidsdpmqhtk.apps.googleusercontent.com";

// Enter one or more authorization scopes. Refer to the documentation for
// the API or https://developers.google.com/people/v1/how-tos/authorizing
// for details.
const scopes = 'profile email openid https://www.googleapis.com/auth/spreadsheets.readonly';