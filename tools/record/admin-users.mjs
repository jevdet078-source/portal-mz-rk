/**
 * Видео «Администрирование — пользователи и полномочия» — по постановке аналитика
 * и замечаниям после тестирования (минимум текста в интерфейсе).
 *
 *   npm run record -- admin-users   → exports/video/4. Администрирование — пользователи.mp4
 *
 * Реестр и поиск; создание с ГБД ФЛ и каскадом профиль → уровень → роль;
 * проверки (Alt 1, 3, 4) и дубликат (Alt 2); редактирование; удаление с отменой (Alt 5);
 * деактивированные и восстановление (Alt 6).
 */

export const title = 'Администрирование — пользователи';
export const fileName = '4. Администрирование — пользователи';
export const start = 'Пользователи.dc.html';

/** Субтитр уходит левее открытой панели, уведомление — выше субтитра */
export const LAYOUT_CSS = [
  'body:has(#am-drawer) #demo-caption{left:calc((100vw - 640px) / 2) !important;width:760px !important}',
  'div[role=status]{bottom:150px !important}',
].join('');

export default async function record(ctx) {
  const { page, sleep, say, title: card, click, point, show, type, clearField, waitText, section } = ctx;
  const layout = () => page.addStyleTag({ content: LAYOUT_CSS }).catch(() => {});
  const pick = async (trigger, option) => { await click('', trigger); await sleep(400); await click(option, '[role=option]'); await sleep(500); };
  /** Найти запись поиском: после создания реестр стоит на странице новой записи */
  const find = async (q) => { await clearField('#am-search'); await type('#am-search', q, 90); await sleep(500); };
  /** Дождаться, пока поле заполнится (ответ ГБД) */
  const filled = async (sel, timeout = 6000) => {
    const t0 = Date.now();
    while (Date.now() - t0 < timeout) {
      if (await page.$eval(sel, (el) => !!el.value).catch(() => false)) return;
      await sleep(150);
    }
    throw new Error('поле не заполнилось: ' + sel);
  };

  await layout();
  await card('Портал МЗ РК · кабинет бизнеса', 'Пользователи и полномочия',
    'Учётные записи: профиль, организация, уровень и роль определяют доступ к функционалу портала.', 5000);

  // ── 1. Реестр ─────────────────────────────────────────────────────
  await section('реестр', async () => {
    await say('Раздел «Администрирование»', 'Виден только в роли «Администратор»');
    await point('Действующие', '[role=tab]');
    await say('Вкладки', 'Действующие, Деактивированные, Удалённые — со счётчиками');
    await point('Тип и профиль', '[role=columnheader]');
    await say('Таблица', 'Тип и профиль, ФИО и ИИН, организация и БИН, почта, уровень и роль — без горизонтальной прокрутки', 4200);
    await type('#am-search', 'ннцрз', 140);
    await sleep(600);
    await say('Поиск', 'По ИИН, имени, фамилии, почте и организации — в том числе по аббревиатуре');
    await pick('#flt-role', 'Председатель формулярной комиссии');
    await say('Фильтры', 'Тип, профиль, уровень и роль');
    await click('Сбросить', 'button');
    await say('«Сбросить»', 'Очищает поиск и фильтры');
  });

  // ── 2. Создание ───────────────────────────────────────────────────
  await section('создание', async () => {
    await card('Сценарий 1', 'Новый пользователь', 'Сотрудник госоргана.');
    await click('Новый пользователь', 'button');
    await sleep(600);
    await say('Форма в боковой панели', 'Реестр остаётся на виду');
    await click('Юридическое лицо', '[role=radio]');
    await say('Тип пользователя', 'Физическое лицо, юридическое лицо или индивидуальный предприниматель');
    await type('#uf-iin', '940815400345');
    await filled('#uf-last');
    await sleep(400);
    await say('ИИН → ГБД ФЛ', 'Фамилия, имя и отчество заполняются автоматически');
    await type('#uf-bin', '110340017483');
    await filled('#uf-org');
    await sleep(400);
    await say('Организация', 'Наименование подставляется по БИН');
    await type('#uf-position', 'Главный эксперт', 60);
    await type('#uf-email', 'a.sarsenova@nncrz.kz', 50);
    await type('#uf-phone', '7012345678', 90);
    await say('Контакты', 'Телефон приводится к формату +7 XXX XXX XX XX');
    await pick('#uf-profile', 'Госорган');
    await say('Профиль → уровень', 'Уровень «Госорган · ННЦРЗ» выбран автоматически по БИН');
    await pick('#uf-role', 'Специалист по профессиональной экспертизе');
    await click('Сохранить', '#am-drawer button');
    await sleep(900);
    await say('Alt 1 · Ошибки заполнения', 'Незаполненные поля подсвечены, сохранение не выполняется');
    await type('#uf-pass', 'qwerty12', 110);
    await type('#uf-pass2', 'qwerty13', 110);
    await page.evaluate(() => document.getElementById('uf-pass2').blur());
    await sleep(500);
    await say('Alt 3 и Alt 4 · Пароль', 'Тексты по постановке: требования к паролю и «Пароли не совпадают.»', 4200);
    await clearField('#uf-pass');
    await type('#uf-pass', 'Qwerty1!', 110);
    await clearField('#uf-pass2');
    await type('#uf-pass2', 'Qwerty1!', 110);
    await click('Сохранить', '#am-drawer button');
    await waitText('Пользователь создан');
    await sleep(500);
    await say('Пользователь создан', 'Запись во вкладке «Действующие», строка подсвечена');
  });

  // ── 3. Дубликат ───────────────────────────────────────────────────
  await section('дубликат', async () => {
    await card('Сценарий 2 · Alt 2', 'Пользователь уже существует', 'ИИН + БИН + тип + профиль + уровень.');
    await click('Новый пользователь', 'button');
    await sleep(500);
    await click('Физическое лицо', '[role=radio]');
    await type('#uf-iin', '010509550711');
    await filled('#uf-last');
    await type('#uf-email', 'test@mail.kz', 50);
    await type('#uf-phone', '7015551234', 70);
    await say('Каскад', 'Для физического лица профиль и уровень выбраны автоматически');
    await pick('#uf-role', 'Специалист с правом подписи');
    await type('#uf-pass', 'Qwerty1!', 80);
    await type('#uf-pass2', 'Qwerty1!', 80);
    await click('Сохранить', '#am-drawer button');
    await waitText('уже зарегистрирован');
    await sleep(600);
    await say('Сообщение по постановке', '«Пользователь с указанными данными уже зарегистрирован.» Создание не выполняется');
    await click('Отмена', '#am-drawer button');
    await sleep(500);
    await say('Закрыть без сохранения?', 'Форма заполнена — система спрашивает подтверждение');
    await click('Закрыть', '#am-confirm button.btn-d');
  });

  // ── 4. Редактирование ─────────────────────────────────────────────
  await section('редактирование', async () => {
    await card('Сценарий 3', 'Редактирование', 'Почта, телефон, уровень, роль, пароль.');
    await find('Искаков');
    await click('Искаков', '[role=row] button.name-btn');
    await sleep(700);
    await say('Карточка', 'Тип, профиль, ИИН, ФИО, БИН и организация — только просмотр');
    await clearField('#uf-email');
    await type('#uf-email', 'e.iskakov@nncrz.gov.kz', 45);
    await show('Пароль', '#am-drawer h3');
    await say('Пароль', 'Необязательно: пустые поля — пароль не меняется');
    await click('Сохранить', '#am-drawer button');
    await waitText('Изменения сохранены');
    await sleep(1200);
  });

  // ── 5. Удаление ───────────────────────────────────────────────────
  await section('удаление', async () => {
    await card('Сценарий 4', 'Удаление пользователя', 'Подтверждение и отмена (Alt 5).');
    await find('Ким');
    await click('', 'button[aria-label^="Удалить: Ким"]');
    await sleep(600);
    await say('Подтверждение', '«Вы уверены, что хотите удалить пользователя?» — «Отмена» ничего не меняет');
    await click('Удалить', '#am-confirm button.btn-d');
    await waitText('Пользователь удалён');
    await say('Удалено', 'Запись во «Удалённых». Ошибку можно исправить — «Отменить» в уведомлении');
    await click('Отменить', 'div[role=status] button');
    await sleep(1200);
  });

  // ── 6. Деактивированные и удалённые ───────────────────────────────
  await section('восстановление', async () => {
    await card('Сценарий 5 · Alt 6', 'Деактивированные и удалённые', 'Просмотр и восстановление.');
    await clearField('#am-search');
    await click('', '#am-tab-inactive');
    await sleep(500);
    await say('Деактивированные', 'Пользователи организаций, удалённых из реестра');
    await click('Галиев', '[role=row] button.name-btn');
    await sleep(700);
    await say('Просмотр', 'Все поля только для чтения, пароль скрыт. Восстановление — после восстановления организации', 4200);
    await click('Закрыть', '#am-drawer button');
    await click('', '#am-tab-deleted');
    await sleep(500);
    await click('', 'button[aria-label^="Восстановить: Серикбаева"]');
    await sleep(600);
    await say('Восстановление', '«Вы действительно хотите восстановить пользователя?»');
    await click('Восстановить', '#am-confirm button.btn-p');
    await waitText('Пользователь восстановлен');
    await sleep(1400);
  });

  await card('Портал МЗ РК · кабинет бизнеса', 'Пользователи и полномочия',
    'Далее — реестр организаций.', 3600);
}
