/*jshint esversion: 8 */
const {
    Key,
    Builder,
    By,
    until
} = require("selenium-webdriver");
let credentials = require('../../credentials');
const {expect} = require('chai');
require("chromedriver");

describe("test run for heroes.epam.com", function () {
    this.timeout(50000);
    let driver;
    beforeEach(async function () {
        driver = await new Builder().forBrowser("chrome").build();
        await driver.manage().setTimeouts( { implicit: 10000 } );
        await driver.get("https://heroes.epam.com/");
        await driver.manage().window().maximize();
    });
    afterEach(async function () {        
        await driver.quit();        
    });

    it("page should contain search field and header with text 'EIS Project badges'", async function () {    
        // default content
        await driver.wait(until.elementLocated(By.id("userNameInput")), 5000);
        await driver.findElement(By.id("userNameInput")).sendKeys(credentials.login);
        await driver.findElement(By.id("passwordInput")).sendKeys(credentials.password);
        await driver.findElement(By.id("submitButton")).click();

        // iFrame
        await driver.wait(until.elementLocated(By.css("#duo_iframe")), 5000);
        await driver.switchTo().frame(0);
        await driver.wait(until.elementLocated(By.xpath('(//button)[1]')), 5000);
        await driver.findElement(By.xpath("(//button)[1]")).click();
        await driver.switchTo().defaultContent();

        // default content
        await driver.wait(until.elementLocated(By.id('idSIButton9')), 30000);
        await driver.findElement(By.id("idSIButton9")).click();
        await driver.wait(until.elementLocated(By.id('heroesGiveBadge')), 30000);
        await driver.findElement(By.id("heroesGiveBadge")).click();
        await driver.wait(until.elementIsVisible(driver.findElement(By.xpath("(//h4)[1]"))), 5000);
        await driver.wait(until.elementLocated(By.xpath("(//input)[2]")), 5000);
        let tittle = await driver.findElement(By.xpath("(//h4)[1]")).getText();
        let searchField = await driver.findElement(By.xpath("(//input)[2]"));
        expect(tittle).to.be.equal("EIS Project badges");
        expect(await searchField.isDisplayed()).to.be.equal(true);
    });

});