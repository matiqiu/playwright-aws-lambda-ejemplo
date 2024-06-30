

const { webkit, chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const AWS = require('aws-sdk');

const url = 'https://playwright.dev/';

exports.url = url;

exports.handler = async (event, context) => {
    
    console.log("Ejecución Handler Index.js");
    const testDir = path.join(__dirname, 'tests');
    const testFiles = fs.readdirSync(testDir).filter(file => file.endsWith('.js'));

    for (const file of testFiles) {
        const testModule = require(path.join(testDir, file));

        if (typeof testModule === 'function') {
            console.log(`Starting browser for test '${file}'`);
            const browser = await chromium.launch({
                executablePath: '/ms-playwright/chromium-1117/chrome-linux/chrome',
                args: ['--single-process'],
            });

            console.log("----------------------------------------------------------------");
            try {
                // Ejecutar la prueba con el nuevo navegador
                await testModule(browser);
                console.log(`Test '${file}' passed successfully.`);
            } catch (error) {
                console.error(`Error running test '${file}': ${error}`);
            } finally {
                // Cerrar el navegador después de cada prueba
                await browser.close();
            }
        }
    }
}