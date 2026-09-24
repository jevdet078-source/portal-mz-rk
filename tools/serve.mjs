/**
 * Локальный статический сервер для просмотра прототипов .dc.html.
 * Файлы .dc.html подгружают соседние компоненты через fetch(), поэтому
 * file:// не работает — нужен http.
 *
 *   node tools/serve.mjs          → http://localhost:5173
 *   node tools/serve.mjs 4000     → другой порт
 *   PORT=4000 node tools/serve.mjs → то же через переменную окружения
 *     (так порт задаёт панель предпросмотра, когда 5173 уже занят)
 */
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const PORT = Number(process.argv[2]) || Number(process.env.PORT) || 5173;

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
  '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
};

const PAGES_DIR = path.join(ROOT, 'project');

function pageList() {
  return fs
    .readdirSync(PAGES_DIR)
    .filter((f) => f.endsWith('.dc.html'))
    .sort((a, b) => a.localeCompare(b, 'ru'));
}

function dsList() {
  const g = path.join(ROOT, 'design-system', 'guidelines');
  if (!fs.existsSync(g)) return [];
  return fs.readdirSync(g).filter((f) => f.endsWith('.card.html')).sort();
}

function indexHtml() {
  const shared = ['Header.dc.html', 'Footer.dc.html', 'Assistant.dc.html'];
  const all = pageList();
  const pages = all.filter((f) => !shared.includes(f));
  const li = (f) =>
    `<li><a href="/project/${encodeURIComponent(f)}">${f.replace('.dc.html', '')}</a></li>`;
  return `<!doctype html><meta charset="utf-8"><title>Портал МЗ РК — прототипы</title>
<style>
 body{font:14px/1.6 Inter,system-ui,sans-serif;background:#F6F8FA;color:#0A0D14;margin:0;padding:48px 40px}
 .wrap{max-width:880px;margin:0 auto}
 h1{font-size:24px;letter-spacing:-.02em;margin:0 0 4px}
 p.sub{color:#868C98;margin:0 0 32px}
 h2{font-size:12px;text-transform:uppercase;letter-spacing:.05em;color:#868C98;margin:32px 0 10px}
 ul{list-style:none;padding:0;margin:0;display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:8px}
 a{display:block;padding:12px 16px;background:#fff;border:1px solid #E2E4E9;border-radius:12px;
   text-decoration:none;color:#31353F;font-weight:500;transition:.15s}
 a:hover{border-color:#4D42E9;color:#4D42E9;transform:translateY(-1px);box-shadow:0 8px 16px rgba(10,13,20,.06)}
</style>
<div class="wrap">
<h1>Портал Министерства здравоохранения РК</h1>
<p class="sub">Прототипы Claude Design · ${pages.length} страниц, ${shared.length} общих компонента</p>
<h2>Страницы</h2><ul>${pages.map(li).join('')}</ul>
<h2>Общие компоненты</h2><ul>${shared.filter((f) => all.includes(f)).map(li).join('')}</ul>
<h2>Дизайн-система AlignUI</h2><ul>
<li><a href="/design-system/ui_kits/medical-portal/index.html">UI-kit «Clinic Portal»</a></li>
<li><a href="/design-system/templates/clinic-portal/index.html">Шаблон дашборда</a></li>
${dsList().map((f) => `<li><a href="/design-system/guidelines/${f}">${f.replace('.card.html', '')}</a></li>`).join('')}
</ul>
</div>`;
}

http
  .createServer((req, res) => {
    const pathname = decodeURIComponent(new URL(req.url, `http://${req.headers.host}`).pathname);
    if (pathname === '/' || pathname === '/index.html') {
      res.writeHead(200, { 'content-type': TYPES['.html'] });
      return res.end(indexHtml());
    }
    const file = path.join(ROOT, pathname);
    if (!file.startsWith(ROOT) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
      res.writeHead(404, { 'content-type': TYPES['.html'] });
      return res.end('<h1>404</h1><a href="/">← к списку страниц</a>');
    }
    res.writeHead(200, {
      'content-type': TYPES[path.extname(file).toLowerCase()] ?? 'application/octet-stream',
      'cache-control': 'no-store',
    });
    fs.createReadStream(file).pipe(res);
  })
  .listen(PORT, () => console.log(`Прототипы: http://localhost:${PORT}`));
