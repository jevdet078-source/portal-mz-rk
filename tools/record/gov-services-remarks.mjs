/**
 * Видео «Государственные услуги — доработки» — правки по замечаниям аналитика
 * после тестирования (Замечания_для_раздела_Гос_услуги.docx).
 *
 *   npm run record -- gov-services-remarks   → exports/video/10. Государственные услуги — доработки.mp4
 *
 * Отдельная страница вместо модального окна, категории по типу пользователя
 * («Гражданам» — «Медицинская помощь», «Бизнесу» — «Фармацевтика» и «Лицензирование
 * и аккредитация»), поиск только по доступным услугам, смена роли в шапке,
 * клавиатура и возврат на предыдущую страницу.
 */

export const title = 'Государственные услуги — доработки';
export const fileName = '10. Государственные услуги — доработки';
export const start = 'Портал Минздрава - Главная.dc.html';

export default async function record(ctx) {
  const { page, sleep, caption, say, title: card, click, point, show, type, waitText, open, section, at } = ctx;

  const top = () => page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' })).then(() => sleep(700));

  // Шапка закреплена (sticky): общий click/point прокручивает к элементу и промахивается —
  // здесь берём координаты как есть, без прокрутки.
  async function hdr(selector, press) {
    const box = await page.evaluate((sel) => { const el = document.querySelector(sel); if (!el) return null; const r = el.getBoundingClientRect(); return { x: Math.round(r.left + r.width / 2), y: Math.round(r.top + r.height / 2) }; }, selector);
    if (!box) throw new Error('нет на экране: ' + selector);
    await at(box.x, box.y);
    await sleep(600);
    if (!press) return;
    await page.evaluate(() => { const r = document.getElementById('demo-ring'); r.classList.remove('on'); void r.offsetWidth; r.classList.add('on'); });
    await sleep(200);
    await page.mouse.click(box.x, box.y);
    await sleep(500);
  }
  const role = (label) => `.hdr-roles button:nth-child(${['Гражданам', 'Бизнесу', 'Медперсоналу'].indexOf(label) + 1})`;
  async function search(text) {
    await type('.gs-search input', text, 110);
    await sleep(700);
  }
  async function clear() {
    await click('', 'button[aria-label="Очистить поиск"]');
    await sleep(500);
  }

  await card('Портал МЗ РК · замечания аналитика', 'Государственные услуги — доработки',
    'Раздел открывается отдельной страницей, а категории услуг зависят от типа пользователя.', 5200);

  // ── Вход с главной ────────────────────────────────────────────────
  await section('главная', async () => {
    await open('Портал Минздрава - Главная.dc.html', { reset: true });
    await waitText('Новое на портале', 15000);
    await hdr(role('Гражданам'));
    await say('Тип пользователя', 'Выбран раздел «Гражданам»', 2400);
    await hdr('a.mp-tile');
    await say('Государственные услуги', 'Плитка в верхнем блоке — теперь это ссылка на страницу, а не окно', 3400);
    await hdr('a.mp-tile', true);
    await waitText('Для граждан', 15000);
    await sleep(800);
  });

  // ── 1. Отдельная страница ─────────────────────────────────────────
  await section('страница', async () => {
    await card('Замечание 1', 'Отдельная страница вместо окна', 'Без затемнения и модального окна: шапка портала, «Назад» и хлебные крошки.');
    await point('Назад', 'a.gs-back');
    await say('Назад', 'Возврат на предыдущую страницу — туда, откуда пришли', 3000);
    await point('Гражданам', '.gs-crumbs a');
    await say('Хлебные крошки', 'Главная › Гражданам › Государственные услуги — видно, в каком разделе вы находитесь', 3600);
    await point('Для граждан', '.gs-aud');
    await say('Контекст', 'Метка и описание под заголовком меняются вместе с типом пользователя', 3200);
  });

  // ── 2. Гражданам ──────────────────────────────────────────────────
  await section('гражданам', async () => {
    await card('Замечание 2', 'Гражданам — только «Медицинская помощь»', 'Категории «Фармацевтика» и «Лицензирование и аккредитация» для граждан не показываются.');
    await point('Медицинская помощь', '.gs-cat');
    await say('Категории', 'Для граждан доступна одна категория — «Медицинская помощь», 21 услуга', 3400);
    await point('Регистрация доверенных контактов', 'a.gs-row');
    await say('Услуга', 'Строка подсвечивается при наведении; по нажатию услуга откроется на eGov.kz в новой вкладке', 3800);
    await point('Услуги оформляются', '.gs-note');
    await say('Куда ведут ссылки', 'Подсказка: на каком портале оформляется услуга', 2800);
  });

  // ── 3. Поиск ──────────────────────────────────────────────────────
  await section('поиск гражданина', async () => {
    await card('Замечание 4', 'Поиск — только по доступным услугам', 'Услуги скрытых категорий в результаты не попадают.');
    await search('справк');
    await say('Поиск', 'Совпадения подсвечиваются, счётчик показывает число найденных услуг', 3400);
    await clear();
    await search('лицензи');
    await waitText('По вашему запросу государственные услуги не найдены');
    await sleep(500);
    await say('Лицензии', 'Для граждан услуги лицензирования не ищутся — скрытая категория в результаты не попадает', 4200);
    await point('Перейти в раздел', 'button.gs-link');
    await say('Подсказка', 'Сами услуги не показываем, но подсказываем раздел, где они есть', 3400);
    await click('Перейти в раздел', 'button.gs-link');
    await waitText('Для бизнеса');
    await sleep(800);
    await say('Бизнесу', 'Тип пользователя сменился — в шапке тоже. Запрос сохранился, нашлись услуги лицензирования', 4200);
    await clear();
  });

  // ── 4. Бизнесу ────────────────────────────────────────────────────
  await section('бизнесу', async () => {
    await card('Замечание 3', 'Бизнесу — фармацевтика и лицензирование', 'Категория «Медицинская помощь» для бизнеса не показывается.');
    await point('Фармацевтика', '.gs-cat');
    await say('Категории', 'Для бизнеса — «Фармацевтика» и «Лицензирование и аккредитация». «Медицинской помощи» нет', 4000);
    await click('Лицензирование и аккредитация', 'button.gs-cat');
    await sleep(600);
    await say('Переключение', 'Категории кликабельны: перечень услуг меняется, выбранная категория выделена', 3600);
    await search('вызов врача');
    await waitText('По вашему запросу государственные услуги не найдены');
    await sleep(500);
    await say('Поиск', '«Вызов врача на дом» — услуга для граждан, бизнесу она не находится', 3600);
    await clear();
  });

  // ── 5. Смена роли в шапке ─────────────────────────────────────────
  await section('смена роли', async () => {
    await card('Замечание 5', 'Смена типа пользователя', 'Переключение в шапке сразу перестраивает категории — без перезагрузки страницы.');
    await hdr(role('Гражданам'), true);
    await waitText('Для граждан');
    await sleep(600);
    await say('Гражданам', 'Категории, метка, хлебные крошки и описание обновились', 3200);
    await hdr(role('Бизнесу'), true);
    await waitText('Для бизнеса');
    await sleep(600);
    await say('Бизнесу', 'И обратно — без перезагрузки', 2400);
  });

  // ── 6. Клавиатура ─────────────────────────────────────────────────
  await section('клавиатура', async () => {
    await card('Замечание 5', 'Управление с клавиатуры', '«/» — к поиску, стрелки — по услугам и категориям, Esc — очистить запрос.');
    await page.evaluate(() => document.activeElement && document.activeElement.blur());
    await point('', '.gs-kbd');
    await say('Клавиша «/»', 'Переводит фокус в поиск с любого места страницы', 2800);
    await page.keyboard.press('/');
    await sleep(500);
    await page.keyboard.type('лиценз', { delay: 110 });
    await sleep(600);
    await page.keyboard.press('ArrowDown');
    await sleep(500);
    await page.keyboard.press('ArrowDown');
    await sleep(500);
    await say('Стрелки', '↓ из поиска — к первой услуге, дальше по списку; Enter откроет услугу', 3400);
    await page.keyboard.press('ArrowUp');
    await sleep(300);
    await page.keyboard.press('ArrowUp');
    await sleep(500);
    await page.keyboard.press('Escape');
    await sleep(600);
    await say('Esc', 'Возврат в поиск и очистка запроса', 2400);
  });

  // ── 7. Прокрутка и возврат ────────────────────────────────────────
  await section('прокрутка', async () => {
    await click('Лицензирование и аккредитация', 'button.gs-cat');
    await sleep(500);
    await page.evaluate(() => window.scrollTo({ top: 420, behavior: 'smooth' }));
    await sleep(1000);
    await say('Поиск под рукой', 'При прокрутке поиск и категории остаются на экране', 3000);
    await top();
    await click('Назад', 'a.gs-back');
    await waitText('Новое на портале', 15000);
    await sleep(800);
    await say('Назад', 'Вернулись на главную — раздел «Бизнесу» сохранён', 3000);
  });

  await card('Портал МЗ РК', 'Государственные услуги — доработки', 'Отдельная страница, категории по типу пользователя, поиск только по доступным услугам. Работает и на планшетах, и на телефонах.', 4600);
}
