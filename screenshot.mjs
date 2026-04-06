// Screenshot tool for local development review
// Usage: node screenshot.mjs http://localhost:3000 [label]
// Saves to ./temporary screenshots/screenshot-N[-label].png (auto-incremented)

import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const url    = process.argv[2] || 'http://localhost:3000';
const label  = process.argv[3] || '';
const outDir = path.join(process.cwd(), 'temporary screenshots');

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

// Find next available screenshot number
const existing = fs.readdirSync(outDir).filter(f => f.startsWith('screenshot-') && f.endsWith('.png'));
const nums = existing.map(f => parseInt(f.match(/screenshot-(\d+)/)?.[1] ?? '0')).filter(n => !isNaN(n));
const n = nums.length ? Math.max(...nums) + 1 : 1;

const filename = label ? `screenshot-${n}-${label}.png` : `screenshot-${n}.png`;
const filePath = path.join(outDir, filename);

const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
const page    = await browser.newPage();
await page.setViewport({ width: 1280, height: 900, deviceScaleFactor: 1 });
await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
await page.screenshot({ path: filePath, fullPage: true });
await browser.close();

console.log(`Saved: ${filePath}`);
