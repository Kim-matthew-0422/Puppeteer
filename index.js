const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    // Replace with the URL of the YouTube video you want to scrape comments from
    const videoUrl = 'https://www.youtube.com/watch?v=pkk24x1x3YI&ab_channel=KentNishimura';
    await page.goto(videoUrl, { waitUntil: 'networkidle2' });

    // Scroll down to load comments
    await page.evaluate(async () => {
        window.scrollBy(0, window.innerHeight);
    });

    // Wait for comments to load
    await page.waitForSelector('#comment', { timeout: 10000 });

    // Extract comments
    const comments = await page.evaluate(() => {
        const commentElements = document.querySelectorAll('#content-text');
        return Array.from(commentElements).map(comment => comment.textContent);
    });

    console.log(comments);

    await browser.close();
})();
