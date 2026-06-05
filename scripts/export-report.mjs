import { chromium } from 'playwright';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const out = path.join(root, 'exports');

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1100, height: 1600 }, deviceScaleFactor: 1 });
await page.goto('file://' + path.join(root, 'dist', 'index.html') + '#/report', { waitUntil: 'networkidle' });
await page.pdf({ path: path.join(out, 'sok-report.pdf'), format: 'A4', printBackground: true, margin: { top: '18mm', right: '16mm', bottom: '18mm', left: '16mm' } });
await browser.close();
