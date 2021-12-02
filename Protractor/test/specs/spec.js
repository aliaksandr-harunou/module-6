const EC = browser.ExpectedConditions;
describe('test for Angular application', function () {
    const EC = browser.ExpectedConditions;
    const invalidSerialNumber = 10000000;
    const inputField = "awInput0";
    const buttonContinue = "//*[contains(@class, '_font-button-submit')]";
    const errorMessage = "//span[contains(@aw-resource, 'sorr')]";
    const buttonOK = "//*[(text() = 'OK')]";
    const iconIpad = "(//button[@class='button-content'])[3]";
    const iconBringIn = "//*[contains(@aria-describedby,'itemDesc1')]";
    const someText = "#locatorHeader > h1";
    const buttonsOnMainPages = "button-content hidden-whiledeck";

    beforeEach(function () {
        browser.get('https://getsupport.apple.com/');
        browser.manage().window().maximize();
    });

    afterEach(function () {
        browser.restart();
    });

    it('should display error message and eleven buttons', function () {
        browser.waitForAngularEnabled(true); // Angular page
        element(by.id(inputField)).sendKeys(invalidSerialNumber);
        element(by.xpath(buttonContinue)).click();
        browser.wait(EC.visibilityOf(element(by.xpath(errorMessage))), 5000);
        expect(element(by.xpath(errorMessage)).getText()).toEqual('We’re sorry, but that is not a valid serial number. Please try again.');
        element(by.xpath(buttonOK)).click();
        element.all(by.className(buttonsOnMainPages)).then(items => expect(items.length).toEqual(11));

    });

    it('should display header with text "Find Locations"', function () {
        browser.waitForAngularEnabled(false); // non-Angular page
        browser.wait(EC.elementToBeClickable(element(by.xpath(iconIpad))), 5000);
        element(by.xpath(iconIpad)).click();
        browser.wait(EC.elementToBeClickable(element(by.xpath(iconBringIn))), 5000);
        element(by.xpath(iconBringIn)).click();
        browser.wait(EC.visibilityOf(element(by.css(someText))), 5000);
        expect(element(by.css(someText)).getText()).toEqual("Find Locations");
    });
});

describe('test for React application', function () {    
    const emailAddressField = "id_email_hero_fuji";
    const myEmail = "Aliaksandr_Harunou@epam.com";    
    const getStartedbuttonCss = "button.btn.btn-red.nmhp-cta.nmhp-cta-extra-large.btn-none.btn-custom";
    const nextButton = "nf-btn nf-btn-primary nf-btn-solid nf-btn-oversize";
    const passwordFieldId = "id_password";

    beforeEach(function () {
        browser.waitForAngularEnabled(false);
        browser.get('https://www.netflix.com/by/');
        browser.manage().window().maximize();
    });

    afterEach(function () {
        browser.restart();
    });

    it('should display Password Field during membership creation', function () {
        browser.wait(EC.visibilityOf(element(by.id(emailAddressField))), 5000);
        element(by.id(emailAddressField)).sendKeys(myEmail);
        element(by.css(getStartedbuttonCss)).click();
        browser.wait(EC.visibilityOf(element(by.className(nextButton))), 5000);
        element(by.className(nextButton)).click();
        browser.wait(EC.visibilityOf(element(by.id(passwordFieldId))), 5000);
        const passwordField = element(by.id(passwordFieldId));
        expect(passwordField.isDisplayed()).toEqual(true);
    });
});