import {Selector} from 'testcafe';
import * as readline from 'readline-sync';

const username = readline.question('Username:');
const password = readline.question('Password:');

fixture `Nordea`
    .page `https://netbank.nordea.ee`;

test('Download Account Statement CSV', async t => {
    // Log in
    await t
        .typeText('#userId', username)
        .click('#btnAcceptUserId')
        .typeText('#authCode', password)
        .click('#btnAcceptAuthCode');

    // Print balance to console
    await t.click(Selector('a').withText('Kontod'));
    console.log(await Selector('table.tgrid1').innerText);

    // Download CSV
    await t.click(Selector('a').withText('Konto väljavõte'))
        .click(Selector('select').withAttribute('name', 'layoutList'))
        .click(Selector('option').withText('CSV-faili eksport'))
        .click('#predefinedPeriod')
        .click(Selector('option').withText('Eelmise kuu algusest tänaseni'))
        .click(Selector('input').withAttribute('value', 'Vaata väljavõtet'));
});
