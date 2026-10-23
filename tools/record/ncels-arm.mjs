/**
 * Видео «АРМ НЦЭЛС — главная эксперта и контроль номера заявки на платёж» (для аналитика).
 *
 *   npm run record -- ncels-arm   → exports/video/19. АРМ НЦЭЛС — главная эксперта.mp4
 *
 * Постановка, п. 2: реестры ЛС и МИ разделены на блоки «В работе», «На согласовании», «На подписании»,
 * «Все заявки» по статусам заявки. Карточки блоков — сводка и вкладки сразу: число, разбивка по срокам,
 * выбор карточки показывает её заявки. П. 1: в форме заявителя номер заявки на платёж, уже
 * использованный в другой заявке, виден в списке, но заблокирован, с подсказкой «Используется в заявке № …».
 */

export const title = 'АРМ НЦЭЛС — главная эксперта';
export const fileName = '19. АРМ НЦЭЛС — главная эксперта';
export const start = 'АРМ НЦЭЛС.dc.html';

export default async function record(ctx) {
  const { page, sleep, say, title: card, click, point, locate, at, type, clearField, open, section } = ctx;

  // навести настоящий курсор (подсказки data-tip показываются по mouseover)
  const hover = async (text, selector) => {
    if (!(await locate(text, selector))) throw new Error('не нашёл: "' + text + '" (' + selector + ')');
    const box = await page.evaluate(([sel, t]) => {
      const all = [...document.querySelectorAll(sel)].filter((n) => n.getClientRects().length > 0 && n.innerText.replace(/\s+/g, ' ').toLowerCase().includes(t.toLowerCase()));
      const el = all.find((n) => !all.some((m) => m !== n && n.contains(m)));
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return { x: Math.round(r.left + r.width / 2), y: Math.round(r.top + r.height / 2) };
    }, [selector, text]);
    if (!box) throw new Error('пропал: ' + text);
    await at(box.x, box.y);
    await sleep(450);
    await page.mouse.move(box.x, box.y, { steps: 6 });
    await sleep(700);
  };
  // цветной счётчик срока внутри карточки блока
  const chip = (tile, kind) => page.evaluate(([t, k]) => {
    const b = [...document.querySelectorAll('button.dl')].find((n) => n.getAttribute('aria-label').startsWith(t + ': ' + k));
    if (!b) return null;
    const r = b.getBoundingClientRect();
    return { x: Math.round(r.left + r.width / 2), y: Math.round(r.top + r.height / 2) };
  }, [tile, kind]);
  const clickChip = async (tile, kind) => {
    const b = await chip(tile, kind);
    if (!b) throw new Error('нет счётчика ' + tile + ' / ' + kind);
    await at(b.x, b.y); await sleep(500);
    await page.mouse.move(b.x, b.y); await sleep(200);
    await page.mouse.click(b.x, b.y); await sleep(500);
  };
  const away = async () => { await page.mouse.move(1500, 120); await sleep(300); };
  const top = async () => { await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' })); await sleep(700); };

  await card('Портал МЗ РК · АРМ НЦЭЛС', 'Главная эксперта: заявки по блокам',
    'Реестры ЛС и МИ разделены на блоки по статусу заявки. У заявителя — контроль повторного использования номера заявки на платёж.', 6000);

  await section('блоки', async () => {
    await page.evaluate(() => sessionStorage.removeItem('mp-nc-ui')).catch(() => {});
    await open('АРМ НЦЭЛС.dc.html#ls');
    await say('Реестр лекарственных средств', 'Четыре блока по постановке: «В работе», «На согласовании», «На подписании» — задачи эксперта, «Все заявки» — по всем экспертам', 6400);
    await hover('На согласовании', '.tl span');
    await say('Подсказки', 'Пояснение к блоку — в подсказке по наведению, на странице только данные', 4200);
    await away();
    const b = await chip('В работе', 'срок истёк');
    if (b) { await at(b.x, b.y); await sleep(400); await page.mouse.move(b.x, b.y, { steps: 4 }); await sleep(700); }
    await say('Сроки', 'Под числом — разбивка по срокам: красный — срок истёк, жёлтый — истекает, зелёный — в срок', 5200);
    await away();
  });

  await section('в работе', async () => {
    await point('Статус', '[role="columnheader"]');
    await say('В работе', 'Статусы блока: Новая, Назначена, Переназначена, В работе, Возвращена с согласования, Возвращена с подписания. Сверху — самые срочные', 6400);
    await click('Все статусы', 'button');
    await sleep(500);
    await say('Фильтр по статусу', 'Внутри блока можно оставить один статус — рядом количество заявок', 4200);
    await click('Переназначена', '[role="option"]');
    await sleep(900);
    await click('Переназначена', 'button');
    await click('Все статусы', '[role="option"]');
    await top();
    await clickChip('В работе', 'срок истёк');
    await say('Срок истёк', 'Клик по красному счётчику — в таблице только просроченные заявки блока', 4600);
    await click('Срок истёк', 'button.chip');
    await sleep(400);
  });

  await section('согласование и подписание', async () => {
    await click('На согласовании', '.tl');
    await say('На согласовании', 'Заявки эксперта со статусом «На согласовании» — ждут руководителя', 4400);
    await click('На подписании', '.tl');
    await say('На подписании', 'Заявки со статусом «На подписании» — у ЗГД. В блоке один статус, поэтому фильтра по статусу нет', 5200);
  });

  await section('все заявки', async () => {
    await click('Все заявки', '.tl');
    await point('Эксперт', '[role="columnheader"]');
    await say('Все заявки', 'Все заявки портала по всем экспертам: добавлен столбец «Эксперт», сверху — новые. Здесь и итоговые статусы: Рекомендована, Отказано', 6200);
    await click('Дата подачи', 'button.sort');
    await say('Сортировка', '«Дата подачи» и «Срок» сортируются по клику на заголовок', 3800);
    await top();
  });

  await section('реестр МИ', async () => {
    await click('Медицинские изделия', 'nav a');
    await sleep(600);
    await click('Все заявки', '.tl');
    await click('Все статусы', 'button');
    await sleep(500);
    await say('Реестр медицинских изделий', 'Те же блоки. В «Все заявки» МИ по постановке ещё: Отменена, Возвращена в работу экспертом, Инициирована отмена, Инициирован отзыв, Отозвана', 7000);
    await page.keyboard.press('Escape');
    await sleep(400);
    await type('input[type="search"]', 'Дала', 140);
    await sleep(700);
    await say('Поиск', 'Поиск по номеру заявки или заявителю — внутри выбранного блока', 4000);
    await clearField('input[type="search"]');
    await sleep(500);
  });

  await section('номер заявки на платеж', async () => {
    await open('Заявка на регистрацию цены.dc.html#ls');
    await say('Кабинет заявителя · новая заявка', 'Регистрация цены ЛС, шаг «Данные услуги»: поле «Номер заявки на платеж» — выбор из списка (так же для изменения цены и для МИ)', 6200);
    await click('Не выбрано', 'span');
    await sleep(500);
    await say('Список номеров', 'Свободные номера доступны. Номер, который уже указан в другой заявке, виден, но выбрать его нельзя', 5400);
    await hover('IFR-123456790', '.pr-opt');
    await say('Номер занят', 'При наведении — «Используется в заявке № 5640547». Клик по занятому номеру ничего не делает', 5400);
    await page.mouse.click(...(await page.evaluate(() => { const r = [...document.querySelectorAll('.pr-opt')][1].getBoundingClientRect(); return [Math.round(r.left + r.width / 2), Math.round(r.top + r.height / 2)]; })));
    await sleep(800);
    await click('IFR-123456791', '.pr-opt');
    await say('Свободный номер', 'Свободный номер выбран — сведения договора и заявки на платеж подставлены, как раньше', 4600);
  });

  await card('Портал МЗ РК · АРМ НЦЭЛС', 'Готово к проверке',
    'Блоки реестров ЛС и МИ по статусам и контроль номера заявки на платеж — по постановке.', 4200);
}
