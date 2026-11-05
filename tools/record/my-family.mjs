/**
 * Видео «Кабинет гражданина — Моя семья и ЭПЗ ребёнка» по постановке
 * «Добавление детей и просмотр электронного паспорта здоровья (ЭПЗ) ребёнка».
 *
 *   npm run record -- my-family   → exports/video/25. Кабинет гражданина — Моя семья и ЭПЗ ребёнка.mp4
 *
 * Пустой раздел, добавление родных детей из ГБД ФЛ, проверка опеки в РБДС со всеми состояниями
 * (пустой и некорректный ИИН, загрузка, не найден, сервис недоступен, техническая ошибка, найден,
 * найдено несколько, добавлен ранее), успешное добавление, карточки, ЭПЗ ребёнка: карточка, QR, выписка,
 * вкладки, блоки и их состояния (загрузка, частично, нет сведений, ошибка). Сценарии ответа сервисов
 * переключаются за кадром — панель «Прототип» в записи скрыта.
 */

export const title = 'Кабинет гражданина — Моя семья и ЭПЗ ребёнка';
export const fileName = '25. Кабинет гражданина — Моя семья и ЭПЗ ребёнка';
export const start = 'Моя семья.dc.html';
// самый частый размер ноутбука (1920×1080 при масштабе 125 %)
export const viewport = { width: 1536, height: 864 };

const KID = '180512501208';

export default async function record(ctx) {
  const { page, sleep, caption, say, title: card, click, point, show, type, clearField, waitText, open, section } = ctx;

  // В записи: без панели «Прототип»; окно добавления — выше субтитра
  const prep = () => page.addStyleTag({ content: '.pp{display:none!important}.fm-ov{align-items:flex-start!important;padding-top:28px!important}.fm-dlg{max-height:calc(100vh - 180px)!important}' }).catch(() => {});
  const go = async (path) => { await open(path); await prep(); await sleep(400); };
  const top = () => page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' })).then(() => sleep(700));
  // Навести настоящий указатель — чтобы показалась подсказка
  const tip = async (text, sel, head, msg, ms) => {
    await point(text, sel);
    const box = await page.evaluate((a) => {
      const el = [...document.querySelectorAll(a[1])].find((n) => n.getClientRects().length && (!a[0] || n.innerText.includes(a[0])));
      if (!el) return null; const r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
    }, [text, sel]);
    if (box) await page.mouse.move(box.x, box.y);
    await sleep(600);
    await say(head, msg, ms);
    await page.mouse.move(5, 300);
    await sleep(200);
  };
  const iin = async (v) => { await clearField('#fm-iin'); if (v) await type('#fm-iin', v, 70); await sleep(200); };
  const rbds = (v) => page.evaluate((x) => sessionStorage.setItem('mp-rbds-scn', x), v);
  const epzScn = async (v) => { await page.evaluate((x) => sessionStorage.setItem('mp-epz-child-scn', x), v); await page.reload({ waitUntil: 'networkidle2' }); await prep(); };

  await card('Портал МЗ РК · личный кабинет гражданина', 'Моя семья и ЭПЗ ребёнка',
    'Новый раздел кабинета: добавление родных и подопечных детей и просмотр их электронных паспортов здоровья.', 5400);

  await section('меню и пустой раздел', async () => {
    await go('Личный кабинет.dc.html');
    await page.evaluate(() => { localStorage.removeItem('mp-family'); sessionStorage.removeItem('mp-rbds-scn'); sessionStorage.removeItem('mp-epz-child-scn'); });
    await point('Моя семья', '.cn-nav a');
    await say('Меню кабинета', 'Новый пункт «Моя семья»', 2800);
    await click('Моя семья', '.cn-nav a');
    await waitText('Дети не добавлены', 15000);
    await prep();
    await sleep(600);
    await say('Моя семья', 'Пока детей нет — нейтральное пустое состояние', 3200);
    await tip('', '.fm-info', 'Подзаголовок', 'Пояснение к разделу — в подсказке, чтобы не перегружать экран', 3800);
    await point('Сведения о детях', '.fm-note');
    await say('Информационный блок', 'Сведения о детях синхронизируются с ГБД ФЛ и актовыми записями ЗАГС', 3800);
  });

  await section('родные дети (ГБД ФЛ)', async () => {
    await click('Добавить ребёнка', '.fm-head .fm-btn');
    await sleep(250);
    await say('Добавить ребёнка в семью', 'Окно открывается на вкладке «Родные дети (ГБД ФЛ)» — сведения запрашиваются из ГБД ФЛ', 3200);
    await waitText('Найдено в ГБД ФЛ', 6000);
    await say('Родные дети', 'Дети, родство с которыми подтверждено: ФИО, ИИН, дата рождения, возраст и статус родства', 4200);
    await click('Сейтжанов Алихан', '.fm-opt');
    await sleep(400);
    await point('Добавить выбранных', '.fm-df .fm-btn');
    await say('Выбор чекбоксами', 'Кнопка показывает, сколько детей выбрано', 3000);
    await click('Выбрать всех', '.fm-link');
    await sleep(400);
    await say('Выбрать всех / Снять выбор', 'Быстрый выбор, когда детей несколько', 3000);
    await click('Добавить выбранных (2)', '.fm-df .fm-btn');
    await waitText('Успешно:', 5000);
    await sleep(500);
    await say('Дети добавлены', 'Окно закрылось, список обновился, сверху — зелёное уведомление «Успешно»', 4200);
    await point('Список прикреплённых детей', '.fm-sec');
    await say('Список прикреплённых детей', 'Заголовок с количеством записей, новые карточки подсвечиваются', 3600);
  });

  await section('все родные уже добавлены', async () => {
    await click('Добавить ребёнка', '.fm-head .fm-btn');
    await waitText('Все найденные дети уже добавлены', 6000);
    await say('Повторное открытие', 'Если все найденные дети уже добавлены — информационное сообщение', 3600);
  });

  await section('РБДС: проверка ИИН', async () => {
    await click('Опекаемый ребёнок', '.fm-tab');
    await sleep(500);
    await say('Опекаемый ребёнок (РБДС)', 'Инструкция и поле «ИИН опекаемого ребёнка» с кнопкой «Проверить в РБДС»', 3800);
    await click('Проверить в РБДС', '.fm-row .fm-btn');
    await sleep(300);
    await say('Пустое поле', 'Подсказка под полем: «Введите ИИН ребёнка»', 3000);
    await iin('12345');
    await click('Проверить в РБДС', '.fm-row .fm-btn');
    await say('Неполный ИИН', '«ИИН должен содержать 12 цифр». В поле вводятся только цифры', 3400);
    await iin('150326507701');
    await click('Проверить в РБДС', '.fm-row .fm-btn');
    await say('Некорректный ИИН', 'Проверяются дата рождения и контрольная цифра ИИН', 3400);
  });

  await section('РБДС: не найден', async () => {
    await iin('150326507706');
    await click('Проверить в РБДС', '.fm-row .fm-btn');
    await sleep(300);
    await say('Загрузка', 'Идёт проверка в РБДС МП РК — кнопка и поле заблокированы', 2400);
    await waitText('Сведения не найдены', 6000);
    await sleep(300);
    await show('Повторить поиск', '.fm-alert .fm-btn');
    await say('Сведения не найдены', 'Пояснение, рекомендации и «Повторить поиск». Кнопка добавления неактивна', 4600);
    await click('Повторить поиск', '.fm-alert .fm-btn');
    await say('Повторить поиск', 'Результат скрывается, ИИН выделен — можно сразу исправить', 3200);
  });

  await section('РБДС: недоступен и ошибка', async () => {
    await rbds('down');
    await click('Проверить в РБДС', '.fm-row .fm-btn');
    await waitText('недоступен', 6000);
    await say('Сервис РБДС недоступен', 'Отдельное сообщение и «Повторить проверку»', 3400);
    await rbds('fail');
    await click('Повторить проверку', '.fm-alert .fm-btn');
    await waitText('Техническая ошибка', 6000);
    await say('Техническая ошибка', 'Другая причина — свой текст', 3000);
    await rbds('auto');
  });

  await section('РБДС: найден', async () => {
    await iin('190715504109');
    await click('Проверить в РБДС', '.fm-row .fm-btn');
    await waitText('Найден 1 ребёнок', 6000);
    await sleep(300);
    await show('Опека подтверждена', '.fm-opt');
    await say('Ребёнок найден', 'Статус «Подопечный (опека)», «Опека подтверждена РБДС МП РК» и документ об установлении опеки', 4600);
    await point('Добавить (1)', '.fm-df .fm-btn');
    await say('Добавить (1)', 'Найденный ребёнок сразу отмечен', 2600);
  });

  await section('РБДС: несколько детей', async () => {
    await iin('211028601402');
    await click('Проверить в РБДС', '.fm-row .fm-btn');
    await waitText('Найдено детей: 3', 6000);
    await sleep(300);
    await show('Результат проверки', '.fm-bar');
    await say('Найдено несколько детей', '«Выбрать всех» и «Снять выбор», список прокручивается внутри окна', 4000);
    await click('Снять выбор', '.fm-link');
    await click('Куанышева Дарина', '.fm-opt');
    await click('Куанышев Арман', '.fm-opt');
    await sleep(300);
    await page.evaluate(() => { const b = document.querySelector('.fm-db'); b && b.scrollTo({ top: b.scrollHeight, behavior: 'smooth' }); });
    await sleep(800);
    await say('Множественный выбор', 'Выбраны двое — «Добавить выбранных (2)»', 3200);
    await click('Добавить выбранных (2)', '.fm-df .fm-btn');
    await waitText('Успешно:', 5000);
    await sleep(500);
    await say('Подопечные добавлены', 'В списке родные и подопечные дети с соответствующими статусами подтверждения', 4200);
  });

  await section('ранее добавленный ребёнок', async () => {
    await click('Добавить ребёнка', '.fm-head .fm-btn');
    await sleep(400);
    await click('Опекаемый ребёнок', '.fm-tab');
    await iin('190715504109');
    await click('Проверить в РБДС', '.fm-row .fm-btn');
    await waitText('Добавлен ранее', 6000);
    await sleep(300);
    await say('Ребёнок уже добавлен', 'Карточка неактивна с отметкой «Добавлен ранее», добавить повторно нельзя', 4000);
    await click('Отменить', '.fm-df .fm-btn');
    await sleep(500);
  });

  await section('карточки детей', async () => {
    await click('', '.fm-ok .fm-x');
    await sleep(400);
    await show('Сейтжанов Алихан', '.fm-card');
    await say('Карточка ребёнка', 'Инициалы, ФИО, статус, ИИН, дата рождения и возраст', 3600);
    await tip('Родство подтверждено', '.fm-conf', 'Родной ребёнок', 'Зелёный индикатор «Родство подтверждено ГБД ФЛ»', 3600);
    await show('Куанышев Арман', '.fm-card');
    await tip('Опека подтверждена', '.fm-conf', 'Подопечный', 'Бирюзовый индикатор «Опека подтверждена РБДС МП РК» и реквизиты документа', 4000);
    await top();
  });

  await section('ЭПЗ ребёнка: верх', async () => {
    await click('ЭПЗ ребёнка', '.fm-card .fm-btn');
    await waitText('Электронный паспорт здоровья (ЭПЗ) ребёнка', 15000);
    await prep();
    await sleep(300);
    await say('ЭПЗ ребёнка', 'Отдельная страница. Пока сведения загружаются — заглушки на месте блоков', 3200);
    await point('Назад в раздел', '.ez-back');
    await say('Навигация', '«Назад в раздел Моя семья»', 2600);
    await tip('Доступ законного представителя', '.ez-access', 'Доступ законного представителя активен', 'Основание доступа — в подсказке', 3600);
    await point('Участковый врач', '.ez-f');
    await say('Карточка ребёнка', 'ФИО, ИИН, дата рождения и возраст, пол, группа крови, медорганизация, участок и участковый врач', 4800);
  });

  await section('QR и выписка', async () => {
    await click('Поделиться с врачом', '.ez-acts .ez-btn');
    await sleep(600);
    await say('Поделиться с врачом (QR)', 'QR-код, по которому врач откроет ЭПЗ ребёнка', 3600);
    await click('Закрыть', '.ez-dlg-f .ez-btn');
    await sleep(400);
    // печатная форма выписки открывается в новой вкладке — в записи её сразу закрываем
    await page.evaluate(() => { window.open = () => ({ document: { open() {}, write() {}, close() {} } }); });
    await click('Скачать выписку', '.ez-acts .ez-btn');
    await sleep(300);
    await caption('Скачать выписку (PDF)', 'Выписка формируется и открывается для сохранения в PDF');
    await waitText('Выписка сформирована', 5000);
    await sleep(2600);
  });

  await section('все разделы ЭПЗ', async () => {
    await show('Антропометрия и развитие', '.ez-bh');
    await say('Антропометрия и развитие', 'Рост, вес, индекс массы тела, давление — с оценкой и датой измерения', 4200);
    await show('Пенициллины', '.ez-al');
    await say('Аллергологический статус', 'Аллерген, тип, степень риска, реакция. Высокий риск выделен красным', 4400);
    await show('Национальный календарь прививок', '.ez-bh', 'start');
    await say('Национальный календарь прививок', 'Наименование, возраст / этап, дата, препарат, медорганизация и статус', 4400);
    await show('Запланировано', '.ez-chip');
    await say('Статусы прививок', '«Выполнено» и «Запланировано» выделены цветом', 3200);
    await show('Диспансерный учёт', '.ez-bh', 'start');
    await say('Диспансерный учёт и текущие диагнозы', 'Группа здоровья, диагнозы с кодами МКБ, дата постановки на учёт и статус наблюдения', 4600);
    await show('История обращений', '.ez-bh', 'start');
    await say('История обращений и приёмов', 'Дата, медорганизация, специалист, причина и результат приёма', 4000);
    await show('Лабораторная диагностика', '.ez-bh', 'start');
    await say('Лабораторная диагностика', 'Показатели с единицами и референсными значениями, отклонения выделены', 4400);
    await top();
  });

  await section('вкладки', async () => {
    await click('Вакцинация', '.ez-tab');
    await sleep(500);
    await say('Вакцинация (Прививочный паспорт)', 'Вкладка показывает только нужный блок', 3200);
    await click('Аллергологический', '.ez-tab');
    await sleep(500);
    await say('Аллергологический анамнез', '', 2400);
    await click('Диагнозы', '.ez-tab');
    await sleep(500);
    await say('Диагнозы и диспансеризация', '', 2400);
    await click('История приёмов', '.ez-tab');
    await sleep(500);
    await say('История приёмов', '', 2400);
    await click('Все разделы', '.ez-tab');
    await sleep(500);
  });

  await section('состояния блоков', async () => {
    await epzScn('slow');
    await sleep(600);
    await say('Данные загружаются', 'Каждый блок показывает заглушку, пока сведения не получены', 3600);
    await epzScn('partial');
    await waitText('Лабораторная диагностика', 8000);
    await sleep(2400);
    await tip('Частично', '.ez-part', 'Данные частично заполнены', 'Отметка «Частично» у блока, недостающие значения — прочерк с подсказкой', 4600);
    await epzScn('empty');
    await sleep(2400);
    await say('Сведения отсутствуют', 'Нейтральное сообщение, без подстановки демонстрационных данных', 4000);
    await epzScn('error');
    await sleep(2400);
    await say('Ошибка получения сведений', 'У каждого блока — своя кнопка «Повторить»', 3400);
    await page.evaluate(() => sessionStorage.setItem('mp-epz-child-scn', 'data'));
    await click('Повторить', '.ez-st .ez-btn');
    await sleep(1400);
    await say('Повторить', 'Блок загрузился заново, остальные не затронуты', 3200);
    await epzScn('data');
    await sleep(1800);
  });

  await section('ЭПЗ подопечного', async () => {
    await click('Назад в раздел', '.ez-back');
    await waitText('Список прикреплённых детей', 15000);
    await prep();
    await sleep(500);
    await show('Куанышев Арман', '.fm-card');
    await page.evaluate(() => { const c = [...document.querySelectorAll('.fm-card')].find((n) => n.innerText.includes('Куанышев Арман')); c && c.querySelector('.fm-btn').setAttribute('data-rec', '1'); });
    await click('ЭПЗ ребёнка', '[data-rec="1"]');
    await waitText('Национальный календарь прививок', 15000);
    await prep();
    await sleep(2400);
    await say('ЭПЗ подопечного ребёнка', 'Тот же паспорт: доступ законного представителя по опеке', 3400);
    await click('Вакцинация', '.ez-tab');
    await sleep(500);
    await show('Просрочено', '.ez-chip');
    await say('Просроченная прививка', 'Статус «Просрочено» выделен красным, срок — в подсказке', 3800);
  });

  await card('Портал МЗ РК', 'Моя семья и ЭПЗ ребёнка',
    'Интерфейс растягивается по ширине экрана — от ноутбука до монитора 27″: карточки детей встают в 2, 3 или 4 колонки.', 4800);
}
