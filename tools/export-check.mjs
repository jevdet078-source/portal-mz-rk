/**
 * Проверка выгрузки для коллег так, как её откроют: двойным кликом (file://), без интернета.
 *
 *   node tools/export-check.mjs                       → проверяет exports/portal-mz-rk
 *   node tools/export-check.mjs "<распакованная папка>" → например, после распаковки .zip
 *
 * Для каждой страницы: нет ошибок JS, страница отрисовалась (есть текст), нет запросов в интернет.
 * Плюс сценарии: главная J (опросник до результата, календарь), раздел «Здоровье на каждом этапе жизни».
 */
import { existsSync, readdirSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { launch } from 'puppeteer-core';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dir = resolve(process.argv[2] || join(root, 'exports', 'portal-mz-rk'));
const chrome = [process.env.CHROME_PATH, 'C:/Program Files/Google/Chrome/Application/chrome.exe', 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  join(process.env.LOCALAPPDATA ?? '', 'Google/Chrome/Application/chrome.exe')].find((p) => p && existsSync(p));
if (!chrome) { console.error('Не нашёл Chrome (CHROME_PATH)'); process.exit(1); }

const url = (f) => pathToFileURL(join(dir, f)).href;
const browser = await launch({ executablePath: chrome, headless: true, args: ['--allow-file-access-from-files'] });
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const fails = [];

async function open(file, { hash = '', w = 1440, h = 900 } = {}) {
  const page = await browser.newPage();
  await page.setViewport({ width: w, height: h });
  const errors = [], online = [];
  page.on('pageerror', (e) => errors.push(String(e.message || e).slice(0, 160)));
  // запрос шаблонной заготовки «{{ photo }}» до подстановки значения — не ошибка
  page.on('console', (m) => { const loc = (m.location() && m.location().url) || ''; if (m.type() === 'error' && !/favicon/i.test(m.text()) && !/%7B%7B/.test(loc)) errors.push(m.text().slice(0, 160)); });
  await page.setRequestInterception(true);
  page.on('request', (r) => { const u = r.url(); if (/^https?:/.test(u)) { online.push(u.slice(0, 100)); r.abort(); } else r.continue(); });
  await page.evaluateOnNewDocument(() => { try { localStorage.setItem('mp-splash', 'off'); } catch (e) {} });
  await page.goto(url(file) + hash, { waitUntil: 'load', timeout: 60000 });
  return { page, errors, online };
}

// 1) все страницы и компоненты
const files = readdirSync(dir).filter((f) => f.endsWith('.dc.html')).sort((a, b) => a.localeCompare(b, 'ru'));
// невизуальные и всплывающие компоненты: открытые сами по себе пустые, внутри страниц работают
const NONVISUAL = /^(HomeData|HomeArt|LifeStagesData|OrgRepData|EdData|FamilyData|Splash|ThemeKit|AiPanel|Toast|ServiceKinds|Assistant|EcpPicker|EdArm|EdDocView|EdSign|HomeBanners|SearchBox)\.dc\.html$/;
let ok = 0;
for (const f of files) {
  const { page, errors, online } = await open(f);
  await wait(2500);
  const text = await page.evaluate(() => (document.body.innerText || '').trim().length);
  const bad = [];
  if (errors.length) bad.push('ошибки: ' + errors.slice(0, 2).join(' | '));
  if (online.length) bad.push('интернет: ' + online.slice(0, 2).join(' | '));
  if (text < 20 && !NONVISUAL.test(f)) bad.push('пустая страница');
  if (bad.length) fails.push(f + ' — ' + bad.join('; ')); else ok++;
  await page.close();
}
console.log(`Страницы: ${ok} из ${files.length} без ошибок`);

// 2) сценарии
async function scenario(name, fn) {
  try { const r = await fn(); console.log('✓', name, r ? '— ' + r : ''); }
  catch (e) { fails.push('Сценарий «' + name + '»: ' + e.message); console.log('✗', name, '—', e.message); }
}
const clickOpt = (page, t) => page.evaluate((t) => { const b = [...document.querySelectorAll('.hr-opt')].find((x) => x.innerText.trim().startsWith(t)); if (!b) throw new Error('нет варианта «' + t + '»'); b.click(); }, t);

await scenario('Главная J: опросник → результат → календарь', async () => {
  const { page, errors } = await open('Главная J - Итоговый.dc.html');
  await page.waitForSelector('.hr-opt', { timeout: 30000 });
  for (const t of ['Для себя', 'Женский', '30', 'Да', 'II']) { await clickOpt(page, t); await wait(500); }
  const title = await page.$eval('.hr-res h3', (e) => e.innerText);
  if (!/Второй триместр/.test(title)) throw new Error('результат: ' + title);
  await page.evaluate(() => [...document.querySelectorAll('.hr-acts a')].find((a) => /Скрининговые/.test(a.innerText)).click());
  await wait(800);
  const tab = await page.$eval('.lp-tab[aria-selected="true"]', (e) => e.innerText.replace(/\s+/g, ' '));
  const dirs = await page.$$eval('.vj-dir', (l) => l.length);
  if (errors.length) throw new Error(errors[0]);
  await page.close();
  return `«${title}», календарь: ${tab}, направлений: ${dirs}`;
});

await scenario('Здоровье на каждом этапе жизни: направления → подраздел → статья', async () => {
  const { page, errors } = await open('Здоровье на каждом этапе жизни.dc.html');
  await page.waitForSelector('.ls-card', { timeout: 30000 });
  const cards = await page.$$eval('.ls-card', (l) => l.length);
  await page.evaluate(() => { location.hash = 'growth'; }); await wait(600);
  const subs = await page.$$eval('.ls-sub-card', (l) => l.length);
  await page.evaluate(() => { location.hash = 'growth/fizicheskoe-razvitie'; }); await wait(800);
  const art = await page.$eval('.ls-art', (e) => ({ h: e.querySelectorAll('h2').length, t: e.querySelectorAll('table').length, len: e.innerText.length }));
  if (cards !== 6 || subs < 5 || art.len < 500) throw new Error(`карточек ${cards}, подразделов ${subs}, текста ${art.len}`);
  if (errors.length) throw new Error(errors[0]);
  await page.close();
  return `карточек ${cards}, подразделов «Рост и развитие» ${subs}, в статье таблиц ${art.t}`;
});

await scenario('Главная J на телефоне 375 px — без горизонтальной прокрутки', async () => {
  const { page } = await open('Главная J - Итоговый.dc.html', { w: 375, h: 812 });
  await page.waitForSelector('.hr-opt', { timeout: 30000 }); await wait(1000);
  const over = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
  if (over > 0) throw new Error('шире экрана на ' + over + ' px');
  await page.close();
  return 'ок';
});

await browser.close();
if (fails.length) { console.log('\nПроблемы:\n' + fails.map((f) => '• ' + f).join('\n')); process.exit(1); }
console.log('\nВыгрузка работает: ошибок нет.');
