/**
 * Видео «Отчётные формы» — постановка от 03.11.2026.
 *
 *   npm run record -- report-forms   → exports/video/24. Отчётные формы.mp4
 *
 * Компактная шапка с пятым пунктом, переход через авторизацию, рабочий контекст, фильтры,
 * свод и его условие, экземпляр отчёта, варианты прав и состояния раздела.
 */

export const title = 'Отчётные формы';
export const fileName = '24. Отчётные формы';
export const start = 'Главная H - Витрина.dc.html';

const PAGE = 'Отчётные формы.dc.html';

export default async function record(ctx) {
  const { page, sleep, say, title: card, click, point, waitText, open, section } = ctx;
  const field = (n) => `.rf-filt > :nth-child(${n}) .rf-sel`;
  const demo = async (text) => {
    await click('Показ прототипа', '.rf-demo-btn');
    await sleep(500);
    await click(text, '.rf-demo .rf-opt');
    await sleep(1100);
  };

  await card('Портал МЗ РК · постановка аналитика', 'Раздел «Отчётные формы»',
    'Новый пункт в шапке, рабочий контекст, фильтры и реестр отчётов.', 5000);

  await section('шапка', async () => {
    await waitText('Отчётные формы', 15000);
    await sleep(1500);
    await point('Отчётные формы', 'a.ph-role');
    await say('Шапка', 'Пятый пункт — «Отчётные формы», сразу после «Клинических протоколов». Все пункты на месте', 3600);
    await say('Шапка', 'Место дали подписи: «Доступность» — значком, название министерства короче. Пояснения — в подсказках', 3800);
    await click('Отчётные формы', 'a.ph-role');
    await waitText('ЭЦП', 15000);
    await sleep(800);
    await say('Без входа', 'Раздел не публичный: сначала авторизация, затем возврат в раздел', 3400);
  });

  await section('реестр', async () => {
    await page.evaluate(() => { localStorage.setItem('mp-profile', 'medical'); localStorage.setItem('mp-iin', '850612300218'); });
    await open(PAGE);
    await waitText('Найдено', 15000);
    await card('Главная страница раздела', 'Контекст и реестр', 'Всё на одной плашке — таблица начинается выше.', 3000);
    await point('Исполнитель', '.rf-role');
    await say('Роли', 'Роли пользователя рядом с заголовком; что они дают — в подсказке', 3200);
    await point('Организация', '.rf-lb');
    await say('Рабочий контекст', 'От чьего имени работает пользователь: организация определяется автоматически', 3400);
    await point('На согласовании', '.rf-row .rf-st');
    await say('Статусы', 'Четыре статуса: цвет, значок и текст — не только цветом', 3200);
  });

  await section('фильтры', async () => {
    await click('Все', field(2));
    await sleep(600);
    await click('28-1-здрав', '.rf-menu .rf-opt');
    await sleep(800);
    await say('Связанные поля', 'Выбрали индекс — форма и № приложения заполнились сами и не противоречат друг другу', 3800);
    await click('Все', field(6));
    await sleep(600);
    await say('Отчётный период', 'Периоды зависят от периодичности формы', 2800);
    await click('Октябрь', '.rf-menu .rf-opt');
    await sleep(500);
    await click('Применить', '.rf-filt button');
    await waitText('Найдено', 5000);
    await sleep(800);
    await say('Применить', 'Несколько условий сразу; результат — с первой страницы', 3000);
    await click('Сбросить', '.rf-filt button');
    await sleep(1000);
    await say('Сбросить', 'Фильтры очищены, рабочий контекст сохранён', 2600);
  });

  await section('страницы', async () => {
    await page.evaluate(() => { const p = document.querySelector('.rf-pager'); if (p) p.scrollIntoView({ block: 'center', behavior: 'smooth' }); });
    await sleep(900);
    await click('2', '.rf-pg');
    await sleep(800);
    await say('Пагинация', 'Сколько найдено и показано, номера страниц и текущая страница', 3000);
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
    await sleep(800);
  });

  await section('свод', async () => {
    await click('Свод по району', '.rf-seg button');
    await waitText('Сформировать свод', 5000);
    await sleep(900);
    await say('Уровень отчётности', 'Показаны только разрешённые уровни. Появился объект, кнопка стала «Сформировать свод»', 3800);
    await click('Сформировать свод', '.rf-cta');
    await sleep(700);
    const pick = async (n, sel, text) => { await click(sel, `.rf-m-bd > :nth-child(${n}) .rf-sel`); await sleep(450); await click(text, '.rf-modal .rf-menu .rf-opt'); await sleep(350); };
    await pick(1, 'Выберите форму', 'Дистанционные');
    await pick(2, 'Выберите таблицу', 'Телеконсультации');
    await pick(4, 'Выберите период', 'Октябрь');
    await click('Продолжить', '.rf-m-ft button');
    await sleep(600);
    await say('Условие свода', 'Проверяется после выбора параметров: нет принятых отчётов — понятное сообщение', 3800);
    await pick(4, 'Октябрь', 'Август');
    await click('Продолжить', '.rf-m-ft button');
    await sleep(900);
    await say('Один экземпляр', 'Есть принятые отчёты — открывается общий экземпляр, копия не создаётся', 3600);
    await page.keyboard.press('Escape');
    await sleep(700);
  });

  await section('открыть', async () => {
    await click('Организация', '.rf-seg button');
    await waitText('Найдено', 5000);
    await sleep(800);
    await click('Открыть', '.rf-open');
    await sleep(800);
    await say('Открыть', 'Рабочее окно экземпляра: доступные действия зависят от прав и статуса', 3400);
    await page.keyboard.press('Escape');
    await sleep(600);
  });

  await section('права', async () => {
    await card('Варианты интерфейса', 'Четыре набора прав', 'Выбор — только в показе прототипа.', 2800);
    await demo('Руководитель');
    await say('Руководитель', 'Кнопки создания нет — реестр отчётов, поступивших на согласование', 3200);
    await demo('Ответственный за свод · область');
    await say('Ответственный за свод', 'Свод по области: свой экземпляр и поступившие отчёты районов', 3200);
    await demo('Только просмотр');
    await say('Только просмотр', 'Лишних действий не показываем', 2600);
    await demo('Исполнитель и ответственный за свод');
  });

  await section('состояния', async () => {
    await demo('Реестр пуст');
    await say('Реестр пуст', 'Кнопка создания сохраняется', 2400);
    await demo('Нет результатов фильтрации');
    await say('Нет результатов', 'Доступна кнопка сброса', 2400);
    await demo('Ошибка получения данных');
    await say('Ошибка', 'Контекст и фильтры сохраняются, есть «Повторить»', 2800);
    await demo('Не назначены права');
    await say('Нет прав', 'Сообщение вместо раздела', 2400);
    await demo('Реестр с данными');
    await sleep(800);
  });
}
