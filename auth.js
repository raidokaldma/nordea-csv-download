const readlineSync = require('readline-sync');

function getAuthCredentials() {
    let username = readlineSync.question('Kasutajatunnus:', {hideEchoBack: true});
    let password = readlineSync.question('Parool:', {hideEchoBack: true});

    return {username, password}
}

module.exports = {
    getAuthCredentials
};