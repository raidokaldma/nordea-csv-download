const webdriver = require('selenium-webdriver');
const By = webdriver.By;
const until = webdriver.until;

require('chromedriver');

function downloadCSV(username, password) {
    const driver = new webdriver.Builder()
        .forBrowser('chrome')
        .build();

    driver.get('https://netbank.nordea.ee');
    driver.findElement(By.id('userId')).sendKeys(username);
    driver.findElement(By.id('btnAcceptUserId')).click();

    let authCodeElement = driver.findElement(By.id('authCode'));
    driver.wait(until.elementIsVisible(authCodeElement));
    authCodeElement.sendKeys(password);
    driver.findElement(By.id('btnAcceptAuthCode')).click();


    driver.wait(until.elementLocated(By.xpath("//a[contains(text(), 'Kontod')]")), 10000);
    driver.findElement(By.xpath("//a[contains(text(), 'Kontod')]")).click();

    driver.wait(until.elementLocated(By.className("tgrid1")), 10000);
    driver.findElement(By.className("tgrid1")).getText().then((contents) => {
        console.log(contents);
    });

    driver.wait(until.elementLocated(By.xpath("//a[contains(text(), 'Konto väljavõte')]")), 10000);
    driver.findElement(By.xpath("//a[contains(text(), 'Konto väljavõte')]")).click();

    let dropdown = driver.findElement(By.name('layoutList'));
    driver.wait(until.elementIsVisible(dropdown));
    dropdown.findElement(By.xpath("//option[contains(text(), 'CSV')]")).click();

    driver.findElement(By.css("input[value='Vaata väljavõtet']")).click();

    driver.findElement(By.xpath("//a[contains(text(), 'Välju')]")).click();

    return driver.quit();
}

module.exports = {
    downloadCSV
};