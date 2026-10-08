/**
 * Видео «Профиль врача — доработки» — только то, что поменялось по замечаниям
 * аналитика после тестирования (профиль врача фидбк.docx).
 *
 *   npm run record -- doctor-profile-remarks   → exports/video/7. Профиль врача — доработки.mp4
 *
 * Единая шапка кабинета медработника, фото профиля (загрузка, замена, удаление),
 * очищенные от лишних подписей шапка профиля и вкладки, прежние места работы —
 * в «Трудовой деятельности», учёная степень убрана, ошибки СУР без пояснений,
 * та же шапка в ЭПЗ и подтверждение ухода из открытого ЭПЗ по ссылкам шапки.
 *
 * Фото — иллюстрация (tools/record/assets/doctor-photo.jpg), не реальный человек.
 */

import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

export const title = 'Профиль врача — доработки';
export const fileName = '7. Профиль врача — доработки';
export const start = 'Профиль врача.dc.html';

const PHOTO = join(dirname(fileURLToPath(import.meta.url)), 'assets', 'doctor-photo.jpg');

export default async function record(ctx) {
  const { page, sleep, caption, say, title: card, click, point, show, waitText, open, section, at } = ctx;

  const PANEL = 'Прототип · ответ СУР';
  async function scn(label) {
    await caption('Панель «Прототип»', 'Ответ СУР: «' + label + '»');
    await click(PANEL, 'button');
    await sleep(400);
    await click(label, 'button[role=radio]');
    await click(PANEL, 'button');
    await sleep(300);
  }
  const top = () => page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' })).then(() => sleep(700));
  const tab = async (name) => { await click(name, '[role=tab]'); await sleep(500); };

  // Шапка закреплена (sticky): общий click/point прокручивает к элементу и промахивается —
  // здесь берём координаты как есть, без прокрутки.
  async function hdr(selector, press) {
    const box = await page.evaluate((sel) => { const el = document.querySelector(sel); if (!el) return null; const r = el.getBoundingClientRect(); return { x: Math.round(r.left + r.width / 2), y: Math.round(r.top + r.height / 2) }; }, selector);
    if (!box) throw new Error('нет в шапке: ' + selector);
    await at(box.x, box.y);
    await sleep(600);
    if (!press) return;
    await page.evaluate(() => { const r = document.getElementById('demo-ring'); r.classList.remove('on'); void r.offsetWidth; r.classList.add('on'); });
    await sleep(200);
    await page.mouse.click(box.x, box.y);
    await sleep(400);
  }

  await card('Портал МЗ РК · кабинет медработника', 'Профиль врача — доработки',
    'Правки по замечаниям аналитика после тестирования: единая шапка, фото профиля, без лишних подписей.', 5200);

  await section('открытие', async () => {
    await open('Профиль врача.dc.html', { reset: true });
    await page.evaluate(() => { localStorage.removeItem('mp-doc-photo'); localStorage.removeItem('mp-doc-notif-read'); sessionStorage.removeItem('mp-sur-scn'); });
    await open('Профиль врача.dc.html');
    await waitText('Обновлено сегодня', 15000);
    await sleep(600);
  });

  // ── 1. Единая шапка ───────────────────────────────────────────────
  await section('шапка', async () => {
    await card('Замечание 1', 'Единая шапка кабинетов', 'Шапка кабинета медработника теперь такая же, как в кабинете бизнеса.');
    await hdr('a.hdr-lnk');
    await say('Шапка портала', 'Герб и название министерства — как в кабинете бизнеса, ведут на главную');
    await hdr('button[title="Уведомления"]', true);
    await sleep(500);
    await say('Уведомления', 'Колокольчик со счётчиком непрочитанных: события врача — например, истекающий сертификат', 3600);
    await hdr('.hdr-bell-pop button[title="Закрыть"]', true);
    await hdr('button.hdr-lang');
    await say('Язык', 'Переключатель ҚАЗ / РУС / ENG');
    await hdr('a.hdr-user');
    await say('Врач', 'На месте организации — сам врач: фото, ФИО и место работы. Нажатие открывает профиль');
    await hdr('a.hdr-home');
    await say('На главную', 'Кнопка возврата на главную страницу портала');
    await point('Кабинет врача', '.dn-cap');
    await say('Меню', 'Меню слева — по образцу кабинета бизнеса: логотип и карточка врача перенесены в шапку');
  });

  // ── 2. Шапка профиля ──────────────────────────────────────────────
  await section('шапка профиля', async () => {
    await point('Ахметов Серик Кайратович', '.pf-fio');
    await say('Шапка профиля', 'Только ФИО и ИИН: убраны бейдж «Подтверждено ЭЦП», должность, категория и медорганизация', 4000);
    await point('Обновлено сегодня', '.pf-sync div');
    await say('Обновление', 'Статус «Сведения из СУР загружены» убран — осталось время обновления и кнопка «Обновить»', 3800);
    await point('Если данные неверны', '.pf-herofoot span');
    await say('Подсказка', 'Короче: только куда обращаться, если данные неверны');
    await point('истекает через', '[role=status]');
    await say('Сертификат', 'Предупреждение о сертификате — одной строкой, без пояснения');
  });

  // ── 3. Фото профиля ───────────────────────────────────────────────
  await section('фото', async () => {
    await card('Замечание 2', 'Фото профиля', 'Вместо букв «АС» — фото, которое врач загружает сам.');
    await point('', 'button.pf-ava');
    await say('Без фото', 'Пока фото нет — нейтральный значок с камерой. Нажатие открывает выбор файла', 3400);
    const [chooser] = await Promise.all([page.waitForFileChooser({ timeout: 8000 }), click('', 'button.pf-ava')]);
    await chooser.accept([PHOTO]);
    await waitText('Выбрать другое');
    await sleep(500);
    await say('Предпросмотр', 'Фото обрезается по центру до квадрата. JPG, PNG или WebP до 5 МБ. Можно выбрать другое', 4200);
    await click('Сохранить', 'button');
    await waitText('Фото профиля загружено');
    await say('Готово', 'Фото сразу появляется в профиле и в шапке кабинета', 2800);
    await hdr('a.hdr-user');
    await sleep(1200);
    await click('', 'button.pf-ava');
    await sleep(400);
    await say('Изменить фото', 'Если фото уже есть — меню: загрузить новое или удалить', 3000);
    await click('Удалить фото', 'button');
    await waitText('Удалить фото профиля?');
    await say('Удаление', 'Удаление — только после подтверждения', 2600);
    await click('Отмена', 'button');
    await sleep(600);
  });

  // ── 4. Места работы ───────────────────────────────────────────────
  await section('места работы', async () => {
    await card('Замечание 3', 'Места работы', 'Только текущие места; прежние — во вкладке «Трудовая деятельность».');
    await show('Текущие места работы', 'h2', 'start');
    await say('Без сводки', 'Убрана строка «2 организации · всего 1,5 ставки»');
    await show('Тип персонала', '.pf-dt');
    await say('Поля', 'Поле «Состояние должности» убрано', 2600);
    await show('Медицинский центр Шипагер', 'h3', 'start');
    await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }));
    await sleep(900);
    await say('Прежние места', 'Блока «Показать прежние места работы» больше нет', 2800);
    await top();
  });

  // ── 5. Квалификация, образование, трудовая деятельность ───────────
  await section('квалификация', async () => {
    await tab('Квалификация');
    await show('Квалификация и сертификаты', 'h2', 'start');
    await say('Квалификация', 'Убраны счётчик «3 сертификата» и подпись «Сертификат специалиста» под специальностью', 4000);
    await top();
  });

  await section('образование', async () => {
    await tab('Образование');
    await show('Последипломная подготовка', 'h2', 'start');
    await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }));
    await sleep(900);
    await say('Образование', 'Раздел «Учёная степень» убран: первичное образование и последипломная подготовка', 3800);
    await top();
  });

  await section('трудовая деятельность', async () => {
    await tab('Трудовая деятельность');
    await point('Стаж в организациях здравоохранения', 'div');
    await say('Стаж', 'Пояснение к расчёту стажа убрано');
    await show('Многопрофильная городская больница', 'h3');
    await say('Прежние места работы', 'Здесь — вся история занятости, в том числе прежние места работы', 3400);
    await top();
    await tab('Места работы');
  });

  // ── 6. Ошибки ─────────────────────────────────────────────────────
  await section('СУР недоступен', async () => {
    await card('Замечание 4', 'Ошибки без лишних слов', 'Во всех сценариях ошибок — только сообщение и кнопки. Панель «Прототип» оставлена.');
    await scn('СУР недоступен');
    await waitText('Не удалось загрузить данные профиля', 8000);
    await sleep(500);
    await say('СУР недоступен', 'Сообщение и кнопки «Повторить» и «Перейти в ЭПЗ». Пояснение и статус «СУР не отвечает» убраны', 4200);
  });

  await section('нет данных', async () => {
    await scn('Нет данных по ИИН');
    await waitText('не найдены в СУР', 8000);
    await sleep(500);
    await say('Нет данных по ИИН', '«Сведения о сотруднике не найдены в СУР.» и «Проверить снова»', 3400);
  });

  await section('сбой метода', async () => {
    await scn('Сбой метода квалификации');
    await sleep(1600);
    await tab('Квалификация');
    await say('Сбой одного раздела', 'Сообщение и «Повторить» — без пояснения', 3000);
    await scn('Все сведения');
    await sleep(1400);
    await tab('Места работы');
  });

  // ── 7. ЭПЗ: та же шапка ──────────────────────────────────────────
  await section('ЭПЗ', async () => {
    await card('Замечание 1', 'Та же шапка в ЭПЗ', 'Электронный паспорт здоровья открывается под той же шапкой кабинета.');
    await click('Электронный паспорт здоровья', 'a.dn-it');
    await waitText('Введите ИИН пациента');
    await sleep(800);
    await say('ЭПЗ', 'Шапка, меню и фото врача — те же, что в профиле', 3000);
    await click('Иванова А.С.', 'button');
    await waitText('Симулировать согласие пациента');
    await click('Симулировать согласие пациента', 'button');
    await waitText('Открыть ЭПЗ пациента');
    await click('Открыть ЭПЗ пациента', 'button');
    await sleep(1400);
    await point('Сессия доступа', 'div');
    await say('Открытый ЭПЗ', '«К поиску пациента» и таймер сессии — панелью под шапкой', 3200);
    await hdr('a.hdr-home', true);
    await waitText('Завершить просмотр ЭПЗ?');
    await sleep(500);
    await say('Подтверждение', 'Ссылки шапки тоже спрашивают подтверждение: уход закроет сессию доступа к ЭПЗ', 3800);
    await click('Остаться', 'button');
    await sleep(800);
  });

  await card('Портал МЗ РК', 'Профиль врача — доработки', 'Единая шапка, фото профиля, без лишних подписей. Работает и на планшетах, и на телефонах.', 4400);
}
