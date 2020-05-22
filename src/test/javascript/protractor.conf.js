exports.config = {
  allScriptsTimeout: 20000,

  specs: ['./e2e/modules/account/*.spec.ts', './e2e/entities/**/*.spec.ts'],

  capabilities: {
    browserName: 'chrome',
    chromeOptions: {
      args: process.env.JHI_E2E_HEADLESS
        ? ['--headless', '--disable-gpu', '--window-size=800,600']
        : ['--disable-gpu', '--window-size=800,600']
    }
  },

  directConnect: true,

  baseUrl: 'http://localhost:8080/',

  framework: 'mocha',

  SELENIUM_PROMISE_MANAGER: false,

  mochaOpts: {
    reporter: 'spec',
    slow: 3000,
    ui: 'bdd',
    timeout: 720000
  },

  beforeLaunch() {
    require('ts-node').register({
      project: './tsconfig.e2e.json'
    });
  },

  onPrepare() {
    // @ts-ignore
    browser.driver
      .manage()
      .window()
      .setSize(1280, 1024);
    // @ts-ignore
    browser.ignoreSynchronization = true;
    // Disable animations
    // @ts-ignore
    browser.executeScript('document.body.className += " notransition";');
    const chai = require('chai');
    const chaiAsPromised = require('chai-as-promised');
    chai.use(chaiAsPromised);
    // @ts-ignore
    global.chai = chai;
  }
};
