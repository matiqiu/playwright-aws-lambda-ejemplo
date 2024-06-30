const { handler, url } = require('../index');

async function test(browser) {
    console.log("Comienza test1");

    console.log(`Navigating to: ${url}`);
    // const browser = await launchBrowser('chromium', []);
    
    try {
        const title = await page.title();
        if (!/Playwright/.test(title)) {
            throw new Error(`Expected title to contain 'Playwright', but got '${title}'`);
        }
    } catch (error) {
        // console.error(`Test failed: ${error}`);
        throw error;
    }
}

module.exports = test;