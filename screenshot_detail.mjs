import puppeteer from 'puppeteer';
import fs from 'fs';

const outDir = './temporary screenshots';
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
const page = await browser.newPage();

// Mobile
await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
await page.screenshot({ path: `${outDir}/screenshot-2-mobile.png`, fullPage: true });
console.log('mobile done');

// Desktop high-res sections
await page.setViewport({ width: 1280, height: 900, deviceScaleFactor: 2 });
await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });

const hero = await page.$('header');
await hero.screenshot({ path: `${outDir}/screenshot-3-hero.png` });
console.log('hero done');

const speakers = await page.$('#speakers');
await speakers.screenshot({ path: `${outDir}/screenshot-4-speakers.png` });
console.log('speakers done');

const program = await page.$('#program');
await program.screenshot({ path: `${outDir}/screenshot-5-schedule.png` });
console.log('schedule done');

const register = await page.$('#register');
await register.screenshot({ path: `${outDir}/screenshot-6-register.png` });
console.log('register done');

await browser.close();
console.log('all done');
