/**
 * Видео «ЭПЗ — амбулаторная помощь» — раздел электронной карты пациента в кабинете врача
 * по постановкам «Оптимизация интерфейса раздела „Амбулаторная помощь“» и
 * «Оптимизация модального окна „Карточка амбулаторного приёма“».
 *
 *   npm run record -- epz-ambulatory   → exports/video/12. ЭПЗ — амбулаторная помощь.mp4
 *
 * Сводка, таблица вместо карточек, сортировка, поиск и фильтры, пагинация,
 * модальное окно с аккордеоном, переход по числу исследований, печать и экспорт.
 */

export const title = 'ЭПЗ — амбулаторная помощь';
export const fileName = '12. ЭПЗ — амбулаторная помощь';
export const start = 'Кабинет врача.dc.html';

export default async function record(ctx) {
  const { page, sleep, say, title: card, click, point, show, type, clearField, waitText, open, section } = ctx;

  const IIN = 'input[maxlength="12"]';
  const SEARCH = '.amb-search input';
  const scrollTable = (left) => page.evaluate((x) => document.querySelector('.amb-scroll').scrollTo({ left: x, behavior: 'smooth' }), left);
  const scrollCard = (top) => page.evaluate((y) => document.querySelector('.amb-dlg-body').scrollTo({ top: y, behavior: 'smooth' }), top);

  await card('Портал МЗ РК · кабинет врача', 'ЭПЗ — амбулаторная помощь',
    'История приёмов — одной таблицей. Подробности приёма — в модальном окне с раскрывающимися разделами.', 5600);

  await section('открытие раздела', async () => {
    await open('Кабинет врача.dc.html');
    await type(IIN, '920512400123', 60);
    await click('Запросить доступ', 'button');
    await sleep(700);
    await click('Симулировать согласие пациента', 'button');
    await sleep(600);
    await click('Открыть ЭПЗ пациента', 'button');
    await waitText('Участковый врач', 5000);
    await sleep(600);
    await click('Амбулаторная помощь', '.epz-nav-btn');
    await waitText('Всего приёмов', 5000);
    await sleep(700);
  });

  await section('сводка и таблица', async () => {
    await point('Всего приёмов', '.amb-stat');
    await say('Сводка', 'Всего приёмов, первичные, повторные и консультации — одной компактной панелью, считается по истории', 4600);
    await point('26.10.2023', '.amb-row');
    await say('Таблица вместо карточек', 'Один приём — одна строка. Дата и время, диагноз и причина обращения — в отдельных столбцах', 4800);
    await point('Повторный', '.amb-pill');
    await say('Цветные индикаторы', 'Вид приёма и характер заболевания выделены компактными метками', 3800);
    await scrollTable(600);
    await sleep(900);
    await point('I10', '.amb-icd');
    await say('Диагноз и причина обращения', 'Код МКБ-10 выделен, рядом — наименование. Причина обращения — отдельным текстом', 4600);
    await point('Хроническое', '.amb-dot');
    await say('Узкий экран', 'Таблица прокручивается по горизонтали, «Дата» и «Действия» остаются на месте', 4400);
    await scrollTable(0);
    await sleep(700);
  });

  await section('сортировка и пагинация', async () => {
    await point('Дата', '.amb-sort');
    await say('Сортировка', 'По умолчанию — от новых к старым. Нажатие на заголовок меняет порядок, стрелка показывает направление', 4600);
    await click('Врач', '.amb-sort');
    await sleep(700);
    await say('По врачу', 'Сортировать можно по дате, времени, виду приёма, врачу, специальности и организации', 4200);
    await click('Дата', '.amb-sort');
    await sleep(700);
    await show('Показано', '.amb-count');
    await point('Показано', '.amb-count');
    await say('Пагинация', 'Диапазон записей и общее количество приёмов, переключение страниц', 3800);
    await click('2', '.amb-pg');
    await sleep(900);
    await click('1', '.amb-pg');
    await sleep(700);
  });

  await section('карточка приёма', async () => {
    await click('12.10.2023', '.amb-row');
    await waitText('Карточка амбулаторного приёма', 4000);
    await sleep(800);
    await say('Карточка амбулаторного приёма', 'Открывается поверх раздела. Сверху — основные сведения о приёме, они закреплены при прокрутке', 5000);
    await say('Разделы', 'Медицинские сведения — единым списком. По умолчанию все свёрнуты, рядом — количество записей', 4600);
    await click('Установленный диагноз', '.amb-sec-h');
    await sleep(600);
    await say('Раскрытие', 'Сведения раскрываются прямо под названием раздела, остальные смещаются вниз', 4200);
    await click('Осмотр пациента', '.amb-sec-h');
    await sleep(600);
    await point('150/95', '.amb-vit-v');
    await say('Несколько разделов сразу', 'Разделы раскрываются независимо. Отклонения показателей выделены цветом', 4400);
    await click('Лабораторные исследования', '.amb-sec-h');
    await sleep(700);
    await point('Липидный профиль', '.amb-it-r');
    await page.evaluate(() => { const r = [...document.querySelectorAll('.amb-it-r')].find((x) => x.innerText.includes('Липидный профиль')); r.querySelector('.amb-more').click(); });
    await sleep(800);
    await say('Подробный результат', 'Показатели с референсными значениями — в той же строке, без дополнительных окон', 4400);
    await click('Назначения', '.amb-sec-h');
    await sleep(700);
    await say('Назначения', 'Лекарства, консультации и исследования: вид, дозировка и режим, длительность, статус', 4400);
    await scrollCard(99999);
    await sleep(900);
    await point('Дополнительные сведения', '.amb-sec-h');
    await say('Нет данных', 'Если сведений нет — раздел не раскрывается, в заголовке «Нет данных»', 4000);
    await point('Печать', '.amb-print');
    await say('Печать', 'Печатная форма выводит все разделы приёма по порядку — независимо от того, что раскрыто', 4400);
    await click('', '.amb-close');
    await sleep(700);
    await point('Показано', '.amb-count');
    await say('Возврат к списку', 'Страница, сортировка, поиск и фильтры сохраняются', 3800);
  });

  await section('исследования', async () => {
    await scrollTable(900);
    await sleep(900);
    await click('3', '.amb-studies');
    await waitText('Карточка амбулаторного приёма', 4000);
    await sleep(900);
    await say('Исследования приёма', 'Нажатие на количество исследований открывает карточку сразу с раскрытыми результатами', 4600);
    await page.keyboard.press('Escape');
    await sleep(700);
    await scrollTable(0);
    await sleep(500);
  });

  await section('поиск и фильтры', async () => {
    await type(SEARCH, 'гастрит', 90);
    await sleep(900);
    await say('Поиск', 'По врачу, специальности, организации, виду приёма, диагнозу и причине обращения', 4400);
    await clearField(SEARCH);
    await sleep(500);
    await click('Все виды приёма', '.amb-dd-btn');
    await sleep(500);
    await click('Консультация', '.amb-opt');
    await sleep(700);
    await say('Вид приёма', 'Таблица показывает только записи, подходящие под условия', 3800);
    await click('Весь период', '.amb-dd-btn');
    await sleep(500);
    await page.evaluate(() => {
      const set = (id, v) => { const el = document.getElementById(id); const d = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value'); d.set.call(el, v); el.dispatchEvent(new Event('input', { bubbles: true })); };
      set('amb-from', '2023-08-01'); set('amb-to', '2023-10-31');
    });
    await sleep(900);
    await say('Период приёма', 'Дата начала и дата окончания. Специальность врача — отдельным списком', 4200);
    await page.keyboard.press('Escape');
    await sleep(400);
    await click('Сбросить фильтры', '.amb-link');
    await sleep(700);
    await point('Экспорт отчёта', '.amb-btn');
    await say('Экспорт отчёта', 'Выгрузка в таблицу: дата, время, код МКБ-10, диагноз и причина обращения — отдельными полями', 4600);
  });

  await card('Портал МЗ РК · кабинет врача', 'ЭПЗ — амбулаторная помощь',
    'Компактная таблица, поиск и фильтры, сортировка, карточка приёма с раскрывающимися разделами, печать и экспорт.', 5200);
}
