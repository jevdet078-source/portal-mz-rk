/**
 * Видео «Администрирование — организации» — по постановке аналитика
 * и замечаниям после тестирования (минимум текста в интерфейсе).
 *
 *   npm run record -- admin-orgs   → exports/video/5. Администрирование — организации.mp4
 *
 * Реестр и поиск; создание по БИН с проверкой уникальности (Alt 2) и ГБД ЮЛ;
 * карточка; удаление с пользователями (Alt 4) и каскад в «Пользователи»;
 * ошибка транзакции; восстановление.
 */

import { LAYOUT_CSS } from './admin-users.mjs';

export const title = 'Администрирование — организации';
export const fileName = '5. Администрирование — организации';
export const start = 'Организации.dc.html';

export default async function record(ctx) {
  const { page, sleep, say, title: card, click, point, show, type, clearField, waitText, open, section } = ctx;
  const layout = () => page.addStyleTag({ content: LAYOUT_CSS }).catch(() => {});
  const go = async (path) => { await open(path); await layout(); };
  const filled = async (sel, timeout = 6000) => {
    const t0 = Date.now();
    while (Date.now() - t0 < timeout) {
      if (await page.$eval(sel, (el) => !!el.value).catch(() => false)) return;
      await sleep(150);
    }
    throw new Error('поле не заполнилось: ' + sel);
  };

  await layout();
  await card('Портал МЗ РК · кабинет бизнеса', 'Организации',
    'Реестр организаций. При удалении организации её пользователи автоматически деактивируются.', 5000);

  // ── 1. Реестр ─────────────────────────────────────────────────────
  await section('реестр', async () => {
    await point('Действующие', '[role=tab]');
    await say('Вкладки', 'Действующие и Удалённые. У удалённых добавляется «Дата закрытия»');
    await point('Наименование организации', '[role=columnheader]');
    await say('Столбцы', 'БИН, наименование, дата открытия. По 15 записей на странице');
    await type('#am-search', 'нцэлс', 140);
    await sleep(600);
    await say('Поиск', 'По БИН и наименованию, в том числе по аббревиатуре');
    await click('Сбросить', 'button');
  });

  // ── 2. Создание ───────────────────────────────────────────────────
  await section('создание', async () => {
    await card('Сценарий 1', 'Новая организация', 'БИН → проверка уникальности → данные из ГБД ЮЛ.');
    await click('Новая организация', 'button');
    await sleep(600);
    await type('#of-bin', '180540024521');
    await sleep(700);
    await say('Alt 2 · Уже существует', '«Организация с указанным БИН уже существует.» — сразу после ввода 12 цифр');
    await clearField('#of-bin');
    await type('#of-bin', '210340012345');
    await filled('#of-ru');
    await sleep(500);
    await say('Данные из ГБД ЮЛ', 'Наименования, адреса и виды деятельности заполнены автоматически');
    await show('Фактический адрес совпадает', 'label');
    await say('Адреса', 'Если фактический адрес совпадает с юридическим — одна отметка');
    await point('Дата создания', 'label');
    await say('Дата создания', 'Присваивается автоматически');
    await click('Сохранить', '#am-drawer button');
    await waitText('Организация создана');
    await sleep(1400);
  });

  // ── 3. Карточка ───────────────────────────────────────────────────
  await section('карточка', async () => {
    await card('Сценарий 2', 'Карточка организации', 'Режим только просмотра.');
    await type('#am-search', 'ннцрз', 120);
    await sleep(500);
    await click('Национальный научный центр', '[role=row] button.name-btn');
    await sleep(800);
    await say('Карточка', 'БИН, наименования на казахском и русском, адреса, ОКЭД, даты создания и изменения', 4200);
    await show('Даты', '#am-drawer h3');
    await sleep(1200);
    await click('Закрыть', '#am-drawer button');
    await clearField('#am-search');
    await sleep(400);
  });

  // ── 4. Удаление с пользователями ──────────────────────────────────
  await section('удаление', async () => {
    await card('Сценарий 3 · Alt 4', 'Удаление организации с пользователями', 'Организация и пользователи меняются одной транзакцией.');
    await click('', 'button[aria-label^="Удалить: ТОО «Астана Групп»"]');
    await sleep(700);
    await say('Сообщение по постановке', '«За данной организацией закреплены пользователи… Продолжить?»');
    await click('Удалить', '#am-confirm button.btn-d');
    await waitText('Организация удалена');
    await sleep(400);
    await say('Удалено', 'Статус INACTIVE, дата закрытия — сегодня. Пользователи организации деактивированы');
    await go('Пользователи.dc.html?q=180540024521&tab=inactive');
    await sleep(600);
    await say('Раздел «Пользователи»', 'Сотрудники организации перешли во «Деактивированные», вход для них закрыт');
  });

  // ── 5. Ошибка транзакции ──────────────────────────────────────────
  await section('ошибка транзакции', async () => {
    await go('Организации.dc.html');
    await card('Сценарий 4', 'Ошибка при удалении', 'Если транзакция не прошла — не меняется ничего.');
    await click('Прототип', 'button');
    await click('Ошибка транзакции', 'button');
    await say('Панель прототипа', 'Имитируем сбой сервера');
    await click('Прототип', 'button');
    await type('#am-search', 'шифа', 120);
    await sleep(400);
    await click('', 'button[aria-label^="Удалить: ТОО «Шифа"]');
    await sleep(500);
    await click('Удалить', '#am-confirm button.btn-d');
    await waitText('Организация не удалена');
    await say('Откат', 'Организация и её пользователи остались без изменений');
    await click('Прототип', 'button');
    await click('Успех', 'button');
    await click('Прототип', 'button');
    await clearField('#am-search');
  });

  // ── 6. Восстановление ─────────────────────────────────────────────
  await section('восстановление', async () => {
    await card('Сценарий 5', 'Восстановление организации', 'Дата закрытия очищается.');
    await click('', '#am-tab-deleted');
    await sleep(500);
    await click('Астана Групп', '[role=row] button.name-btn');
    await sleep(800);
    await click('Восстановить', '#am-drawer button');
    await sleep(600);
    await say('Восстановить организацию?', 'Отметка возвращает и пользователей, деактивированных при удалении');
    await click('Восстановить', '#am-confirm button.btn-p');
    await waitText('Организация восстановлена');
    await sleep(1400);
  });

  await card('Портал МЗ РК · кабинет бизнеса', 'Организации',
    'Реестр, карточка, создание по БИН, удаление с деактивацией пользователей и восстановление.', 4000);
}
