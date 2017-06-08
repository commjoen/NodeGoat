var config = require("../../config/config");
var assert = require("assert");
var should = require("should");
var async = require("async");
var By = require("selenium-webdriver").By;
var chromeDriver = require("chromedriver");

// Documentation for the selenium JS webdriver: https://code.google.com/p/selenium/wiki/WebDriverJs
var seleniumWebdriver = require("selenium-webdriver");
var webDriver;
var chrome = require("selenium-webdriver/chrome");
var test = require("selenium-webdriver/testing");
var proxy = require("selenium-webdriver/proxy");
var path = chromeDriver.path;
var service = new chrome.ServiceBuilder(path).build();

// SUT is an acronym for System Under Test.
var sutProtocol = "http://";
var zapTargetApp = sutProtocol + config.hostName + ":" + config.port + "/";
var zapOptions = {
  proxy: (sutProtocol + config.zapHostName + ":" + config.zapPort + "/"),
  targetApp: zapTargetApp
};
var ZapClient = require("zaproxy");
var zaproxy = new ZapClient(zapOptions);
var zapTargetAppRoute = "profile";
var zapTargetAppAndRoute = zapTargetApp + zapTargetAppRoute;
var zapApiKey = config.zapApiKey;
var fs = require("fs");

var state = {
  description: "",
  error: null
};

var sutUserName = "user1";
var sutUserPassword = "User1_123";

chrome.setDefaultService(service);


test.before(function() {
  "use strict";
  this.timeout(20000);
  webDriver = new seleniumWebdriver.Builder()
    .withCapabilities(seleniumWebdriver.Capabilities.chrome())
    // http://code.tutsplus.com/tutorials/an-introduction-to-webdriver-using-the-javascript-bindings--cms-21855
    // Proxy all requests through Zap before using Zap to find vulnerabilities,
    // otherwise Zap will say: "URL not found in the scan tree".
    .setProxy(proxy.manual({
      http: config.zapHostName + ":" + config.zapPort
    }))
    .build();

});

test.describe("The RetirEasy app ", function() {
  "use strict";
  this.timeout(0);

  test.it("Should allow a user to login", function(done) {
    webDriver.getWindowHandle();
    webDriver.get(zapTargetApp);
    webDriver.sleep(1000);
    webDriver.findElement(By.name("userName")).sendKeys(sutUserName);
    webDriver.findElement(By.name("password")).sendKeys(sutUserPassword);
    webDriver.sleep(1000);
    webDriver.findElement({
      tagName: "button",
      type: "submit"
    }).click();
    assert(webDriver.get);
    webDriver.sleep(1000);
    webDriver.getCurrentUrl().should.eventually.endWith("dashboard");
    webDriver.findElement(By.id("logout-menu-link")).click();
    done();
  });

  test.it("Should allow a logged in user to update contributions", function(
    done) {
    webDriver.getWindowHandle();
    webDriver.get(zapTargetApp);
    webDriver.sleep(1000);
    webDriver.findElement(By.name("userName")).sendKeys(sutUserName);
    webDriver.findElement(By.name("password")).sendKeys(sutUserPassword);
    webDriver.sleep(1000);
    webDriver.findElement({
      tagName: "button",
      type: "submit"
    }).click();
    assert(webDriver.get);
    webDriver.sleep(1000);
    webDriver.findElement(By.id("contributions-menu-link")).click();
    webDriver.sleep(1000);
    webDriver.findElement(By.name("preTax")).sendKeys("8");
    webDriver.findElement(By.name("roth")).sendKeys("8");
    webDriver.findElement(By.name("afterTax")).sendKeys("8");
    webDriver.findElement(By.className("btn-default")).click();
    webDriver.sleep(1000);
    webDriver.findElement(By.className("alert")).isDisplayed();
    webDriver.findElement(By.id("logout-menu-link")).click();
    done();
  });

  test.it("Should allow a user to register", function(done) {
    webDriver.getWindowHandle();
    webDriver.get(zapTargetApp);
    webDriver.sleep(1000);
    webDriver.findElement(By.linkText("New user? Sign Up")).click();
    webDriver.findElement(By.name("userName")).sendKeys("testuser2");
    webDriver.findElement(By.name("firstName")).sendKeys("test");
    webDriver.findElement(By.name("lastName")).sendKeys("user");
    webDriver.findElement(By.name("password")).sendKeys("loginpw");
    webDriver.findElement(By.name("verify")).sendKeys("loginpw");
    webDriver.findElement(By.name("email")).sendKeys("test@info2.nl");
    webDriver.findElement(By.className("btn-primary")).click();

    assert(webDriver.get);
    webDriver.sleep(1000);
    webDriver.findElement(By.id("logout-menu-link")).isDisplayed();

    webDriver.findElement(By.id("logout-menu-link")).click();

    done();
  });
});
