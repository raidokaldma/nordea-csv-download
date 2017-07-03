const auth = require('./auth');
const web = require('./webScraper');

let authCredentials = auth.getAuthCredentials();
web.downloadCSV(authCredentials.username, authCredentials.password).then(() => {
    require('child_process').execSync('open ~/Downloads');
});

