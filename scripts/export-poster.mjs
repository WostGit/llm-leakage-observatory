import { chromium } from 'playwright';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const out = path.join(root, 'exports');

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 });
await page.goto('file://' + path.join(root, 'dist', 'index.html'), { waitUntil: 'networkidle' });
await page.pdf({ path: path.join(out, 'poster.pdf'), width: '48in', height: '36in', printBackground: true });
await page.screenshot({ path: path.join(out, 'poster.png'), fullPage: true });
await browser.close();
