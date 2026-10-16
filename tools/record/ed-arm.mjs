/**
 * Видео «АРМ ННЦРЗ и Формулярной комиссии — услуга ЕД».
 *
 *   npm run record -- ed-arm   → exports/video/14. АРМ ННЦРЗ и ФК — услуга ЕД.mp4
 *
 * Постановки UC01.13.3 (АРМ ННЦРЗ) и UC01.13.4 (АРМ ФК): реестр и задачи роли, назначение,
 * решение эксперта с ЭЦП, маршрут согласования, замечания к полям с PDF-заключением,
 * подпись Председателя Правления, хронология; комиссия ФК — голосование, решение секретаря,
 * подпись председательствующего и протоколы. Роли переключаются в шапке АРМ.
 */

export const title = 'АРМ ННЦРЗ и ФК — услуга ЕД';
export const fileName = '14. АРМ ННЦРЗ и ФК — услуга ЕД';
export const start = 'АРМ ННЦРЗ.dc.html';

export default async function record(ctx) {
  const { page, sleep, say, title: card, click, point, type, waitText, open, section } = ctx;

  const asUser = async (key, id) => { await page.evaluate((k, v) => localStorage.setItem(k, v), key, id); };
  const sign = async () => {
    await waitText('Пароль от хранилища', 6000);
    await type('input[type="password"]', '1', 140);
    await click('Открыть', 'button');
    await waitText('Выберите сертификат', 5000);
    await sleep(700);
    await click('Подписать', '[role="dialog"] button');
    await sleep(1800);
  };
  const dropFile = async (name) => {
    await page.evaluate((n) => {
      const z = document.querySelector('#cur-form .drop');
      const dt = new DataTransfer();
      dt.items.add(new File(['%PDF-1.4'], n, { type: 'application/pdf' }));
      z.dispatchEvent(new DragEvent('drop', { dataTransfer: dt, bubbles: true, cancelable: true }));
    }, name);
    await sleep(700);
  };

  await card('Портал МЗ РК · услуга ЕД', 'АРМ ННЦРЗ и Формулярной комиссии',
    'Сотрудники рассматривают заявки на включение ЛС / МИ в перечень Единого дистрибьютора. Роли переключаются в шапке АРМ.', 5600);

  await section('реестр и роли', async () => {
    await open('АРМ ННЦРЗ.dc.html#registry');
    await point('Мои задачи', '[role="tab"]');
    await say('Мои задачи', 'Очередь роли: заявки, где «Назначено на» — текущий сотрудник', 3800);
    await point('Осталось дней', '[role="columnheader"]');
    await say('Реестр по постановке', 'Столбцы UC01.13.3.1, живой таймер в зелёной рамке, ноль — красной, иначе прочерк', 4200);
    await click('', 'button[title="Сотрудник и роль"]');
    await sleep(600);
    await say('Работать от имени', 'Все сотрудники ННЦРЗ и ФК с числом задач — можно пройти процесс за каждую роль', 4600);
    await page.keyboard.press('Escape');
    await sleep(400);
  });

  await section('назначение эксперта', async () => {
    await open('Карточка заявки ННЦРЗ.dc.html?n=0000126');
    await say('Новая заявка', 'Начальник управления назначает ответственного — подсказка в разделе и кнопка в панели действий', 4000);
    await click('Назначить ответственного', 'button');
    await sleep(700);
    await say('Выбор ответственного', 'Эксперты и «назначить себя» с текущей нагрузкой', 3600);
    await click('Сагинов', '[role="radio"]');
    await click('Назначить ответственного', '[role="dialog"] button');
    await waitText('Ответственный назначен', 6000);
    await say('Сразу в реестр', 'Статус «В работе», «Назначено на» — эксперт. Эксперту ушло уведомление', 4000);
  });

  await section('решение эксперта', async () => {
    await asUser('mp-arm-user-nn', 'nn-exp1');
    await open('Карточка заявки ННЦРЗ.dc.html?n=0000126');
    await click('Не соответствует пункту 7', '[role="radio"]');
    await say('Пункт 7', '«Не соответствует» — появляется загрузка счёта 20%. Кнопка отправки включится только с файлом — рядом подсказка, чего не хватает', 5200);
    await dropFile('Счёт на оплату 20% № 0000126.pdf');
    await click('Подписать и отправить', '#cur-form button');
    await sleep(700);
    await say('Согласующий', 'Модалка «Выберите согласующего пользователя», затем подпись ЭЦП сотрудника', 3800);
    await click('Сохранить', '[role="dialog"] button');
    await sign();
    await say('Отправлено', 'Заявка на согласовании у начальника управления, у заявителя по-прежнему «В работе»', 4000);
  });

  await section('замечания к полям', async () => {
    await asUser('mp-arm-user-nn', 'nn-exp2');
    await open('Карточка заявки ННЦРЗ.dc.html?n=0000154');
    await click('Заявление', 'nav[aria-label="Разделы заявки"] button');
    await sleep(600);
    await point('Торговое наименование', 'dt');
    await say('Замечание к полю', 'Иконка комментария справа от поля — только у назначенного эксперта, один раз за цикл', 4200);
    await click('', 'button[aria-label^="Добавить замечание к полю Торговое"]');
    await type('#m-text', 'Торговое наименование не совпадает с регистрационным удостоверением', 35);
    await click('Сохранить', '[role="dialog"] button');
    await sleep(800);
    await say('Отработка замечаний', 'Над «Принятием решения» появился шаг «Отработка замечаний», у раздела — счётчик', 4200);
    await click('Отработка замечаний', 'nav[aria-label="Разделы заявки"] button');
    await type('#fi-cNum', 'ЗПЭ-0000154', 60);
    await type('#fi-cDate', '16102026', 60);
    await type('#fa-cText', 'Выявлены расхождения сведений заявления с регистрационным удостоверением.', 25);
    await click('Сохранить', '#cur-form button');
    await sleep(800);
    await click('Сформировать PDF-файл', '#cur-form button');
    await sleep(1200);
    await say('PDF-заключение', 'По образцу: шапка ННЦРЗ, данные заявителя и ЛС / МИ, замечания, подписи и блок «Решения» с QR', 5200);
    await page.keyboard.press('Escape');
    await sleep(500);
  });

  await section('подпись Председателя Правления', async () => {
    await asUser('mp-arm-user-nn', 'nn-chair');
    await open('Карточка заявки ННЦРЗ.dc.html?n=0000160');
    await say('История решений', 'Завершённые решения свёрнуты в строки, открыт блок, который ждёт подписи', 4200);
    await point('Ожидает подписи', 'li');
    await say('Маршрут согласования', 'Эксперт → начальник управления → директор департамента → Председатель Правления', 4200);
    await click('Подписать', 'button');
    await sign();
    await say('Подписано', 'Заявителю ушли заключение, сопроводительное письмо и АВР, срок — 5 рабочих дней', 4000);
    await open('Карточка заявки ННЦРЗ.dc.html?n=0000160');
    await click('Хронология заявки', 'button');
    await sleep(800);
    await say('Хронология', 'Каждое действие — новая строка: роль, ФИО, даты начала и завершения, статус, комментарий', 4600);
    await page.keyboard.press('Escape');
  });

  await section('голосование в ФК', async () => {
    await asUser('mp-arm-user-fk', 'fk-m3');
    await open('Комиссия ФК.dc.html?id=c6&from=active');
    await say('Голосование', 'Ознакомление истекло — у участника кнопки «За» / «Против» по каждому объекту', 4200);
    await page.evaluate(() => { [...document.querySelectorAll('[role="radio"]')].filter(b => b.textContent.trim() === 'За').forEach(b => b.click()); });
    await sleep(600);
    await click('Завершить', 'button');
    await sign();
    await say('Голос подписан', 'Изменить голос нельзя, у секретаря растёт N в N/M', 3600);
  });

  await section('решение секретаря и протоколы', async () => {
    await asUser('mp-arm-user-fk', 'fk-sec');
    await open('Комиссия ФК.dc.html?id=c7&from=active');
    await point('Голоса по каждому', 'h2');
    await say('Секретарь', 'Явка и голоса каждого участника по каждому объекту', 3800);
    await click('Комиссия состоялась', '[role="radio"]');
    await type('#fk-prot', 'ФК-14/2026', 60);
    await click('Подписать', 'button');
    await sign();
    await asUser('mp-arm-user-fk', 'fk-chair');
    await open('Комиссия ФК.dc.html?id=c7&from=approval');
    await say('Председательствующий', 'Пункт «Согласование» и кнопка «Подписать» справа сверху', 3600);
    await click('Подписать', 'button');
    await sign();
    await click('', 'button[aria-label="Открыть протокол 1"]');
    await sleep(1200);
    await say('Протоколы', 'Именной — в ННЦРЗ, обезличенный — заявителю. Заявкам присвоен статус «Решение принято»', 4800);
    await page.keyboard.press('Escape');
  });

  await card('Портал МЗ РК · услуга ЕД', 'АРМ ННЦРЗ и ФК',
    'Назначение, решения, согласование с ЭЦП, замечания с PDF, хронология, комиссия и протоколы — по постановкам UC01.13.3 и UC01.13.4.', 5200);
}
