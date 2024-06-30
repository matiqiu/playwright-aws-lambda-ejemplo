const { handler, url  } = require('../index');

async function test(browser) {
    console.log("Comienza test2");
    console.log(`Navigating to: ${url}`);
    // const browser = await launchBrowser('chromium', []);
    
    try {
        const element = await page.getByRole('heading', { name: 'Installation' });
        const isVisible = await element.isVisible();

        if (!isVisible) {
        throw new Error(`Expected element with role 'heading' and name 'Installation' to be visible`);
        }

    } catch (error) {
        throw error;
    }
}

module.exports = test;