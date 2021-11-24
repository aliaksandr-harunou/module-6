describe('tests for Apple Support application', function() {
    const EC = browser.ExpectedConditions;
    const invalidSerialNumber = 10000000;
    const inputField = "awInput0";
    const buttonContinue = "//*[contains(@class, '_font-button-submit')]";
    const errorMessage = "//span[contains(@aw-resource, 'sorr')]";
    const buttonOK = "//*[(text() = 'OK')]";
    const iconIpad = "(//button[@class='button-content'])[3]";
    const iconBringIn = "//*[contains(@aria-describedby,'itemDesc1')]";
    const someText = "#locatorHeader > h1";  

    beforeEach(function() {
        browser.waitForAngularEnabled(false);
        browser.get('https://getsupport.apple.com/');
        browser.manage().window().maximize();
    });

    afterEach(function() {
        browser.restart();
    });

    it('should display error message and eleven buttons', function() {        
        element(by.id(inputField)).sendKeys(invalidSerialNumber);        
        element(by.xpath(buttonContinue)).click();
        browser.wait(EC.visibilityOf(element(by.xpath(errorMessage))), 5000);
        expect(element(by.xpath(errorMessage)).getText()).toEqual('We’re sorry, but that is not a valid serial number. Please try again.');
        element(by.xpath(buttonOK)).click();
        element.all(by.className('button-content hidden-whiledeck')).then(items => expect(items.length).toEqual(11));
        
    });

    it('should display header with text "Find Locations"', function() {         
        browser.wait(EC.elementToBeClickable(element(by.xpath(iconIpad))), 5000);     
        element(by.xpath(iconIpad)).click();
        browser.wait(EC.elementToBeClickable(element(by.xpath(iconBringIn))), 5000);
        element(by.xpath(iconBringIn)).click();
        browser.wait(EC.visibilityOf(element(by.css(someText))), 5000);
        expect(element(by.css(someText)).getText()).toEqual("Find Locations");
    });
});
