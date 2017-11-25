const webdriver = require('selenium-webdriver');
const By = webdriver.By;
const until = webdriver.until;

require('chromedriver');

function downloadCSV(username, password) {
    const driver = new webdriver.Builder()
        .forBrowser('chrome')
        .build();

    driver.get('https://netbank.nordea.ee');

    driver.executeScript(`document.getElementById('userId').setAttribute('value', '${username}')`);
    driver.findElement(By.id('btnAcceptUserId')).click();

    driver.wait(until.elementIsVisible(driver.findElement(By.id('authCode'))));
    driver.executeScript(`document.getElementById('authCode').value='${password}'`);
    driver.findElement(By.id('btnAcceptAuthCode')).click();

    driver.wait(until.elementLocated(By.xpath("//a[contains(text(), 'Kontod')]")), 10000);
    driver.findElement(By.xpath("//a[contains(text(), 'Kontod')]")).click();

    driver.wait(until.elementLocated(By.className("tgrid1")), 10000);
    driver.findElement(By.className("tgrid1")).getText().then((contents) => {
        console.log(contents);
    });

    driver.wait(until.elementLocated(By.xpath("//a[contains(text(), 'Konto väljavõte')]")), 10000);
    driver.findElement(By.xpath("//a[contains(text(), 'Konto väljavõte')]")).click();

    let exportFormatDropdown = driver.findElement(By.name('layoutList'));
    driver.wait(until.elementIsVisible(exportFormatDropdown));
    exportFormatDropdown.findElement(By.xpath("//option[contains(text(), 'CSV')]")).click();

    driver.findElement(By.name('predefinedPeriod')).findElement(By.xpath("//option[contains(text(), 'Eelmise kuu algusest')]")).click();

    driver.findElement(By.css("input[value='Vaata väljavõtet']")).click();

    driver.findElement(By.xpath("//a[contains(text(), 'Välju')]")).click();

    return driver.quit();
}

module.exports = {
    downloadCSV
};