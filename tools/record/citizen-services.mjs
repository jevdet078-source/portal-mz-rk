/**
 * Видео «Кабинет гражданина — услуги и фото профиля» по постановке «Раздел „Услуги“ в ЛК гражданина».
 *
 *   npm run record -- citizen-services   → exports/video/21. Кабинет гражданина — услуги и фото профиля.mp4
 *
 * Пункт меню «Услуги», перечень «Медицинская помощь», наведение и переход, поиск (результаты, очистка,
 * «не найдено»), загрузка (skeleton), затем фото профиля: стандартный аватар, наведение, окно,
 * выбор и кадрирование, сохранение, ошибки формата / размера / загрузки, отмена.
 * Фото — иллюстрация (tools/record/assets/citizen-photo.jpg), не реальный человек.
 */
import { writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const PHOTO = join(HERE, 'assets', 'citizen-photo.jpg');
const PDF = resolve(HERE, '..', '..', 'project', 'assets', 'lmk-sample.pdf');

export const title = 'Кабинет гражданина — услуги и фото профиля';
export const fileName = '21. Кабинет гражданина — услуги и фото профиля';
export const start = 'Личный кабинет.dc.html';
// самый частый размер ноутбука (1920×1080 при масштабе 125 %)
export const viewport = { width: 1536, height: 864 };

export default async function record(ctx) {
  const { page, sleep, say, title: card, click, point, at, type, waitText, open, section } = ctx;
  // Файл > 5 МБ для ошибки размера
  const BIG = join(tmpdir(), 'фото-с-телефона.jpg');
  writeFileSync(BIG, Buffer.alloc(Math.round(7.4 * 1048576)));

  // Кнопка нажимается клавишей: щелчок мышью, открывший системное окно, оставляет кнопку мыши
  // «зажатой» в безголовом Chrome — следующие движения курсора стали бы перетаскиванием
  const choose = async (file, label = 'Выберите файл', sel = '.cn-dlg button') => {
    await point(label, sel);
    await page.evaluate((l) => [...document.querySelectorAll('.cn-dlg button')].find(b => b.innerText.includes(l)).focus(), label);
    const [chooser] = await Promise.all([page.waitForFileChooser({ timeout: 8000 }), page.keyboard.press('Enter')]);
    await chooser.accept([file]);
    await sleep(600);
  };
  const pp = async (label) => {
    const open = await page.evaluate(() => !!document.querySelector('.su-pp.open'));
    if(!open) await click('Прототип', '.pp-head');
    await click(label, '.pp-btn');
  };
  const center = (sel) => page.evaluate((s) => { const r = document.querySelector(s).getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2, w: r.width }; }, sel);

  await card('Портал МЗ РК · личный кабинет гражданина', 'Услуги и фото профиля',
    'Новый раздел «Услуги» с перечнем медицинских госуслуг и загрузка фотографии профиля прямо из карточки пользователя.', 5200);

  await section('меню', async () => {
    await page.evaluate(() => { localStorage.removeItem('mp-avatar'); sessionStorage.removeItem('mp-avatar-scn'); });
    await open('Личный кабинет.dc.html');
    await point('Услуги', '.cn-it');
    await say('Меню кабинета', 'Новый пункт «Услуги» — между «ЭПЗ» и «Уведомлениями», со своей иконкой', 3800);
    await click('Услуги', '.cn-it');
    await sleep(300);
    await say('Загрузка', 'Пока перечень загружается, на месте строк — skeleton', 1400);
    await waitText('Вызов врача на дом', 8000);
    await sleep(500);
    await point('Услуги', '.cn-it.on');
    await say('Активный пункт', 'Выбранный раздел выделен цветом портала и остаётся выделенным, пока вы в разделе', 3800);
  });

  await section('страница', async () => {
    await point('Государственные услуги', 'h1');
    await say('Отдельная страница', 'Навигационная цепочка, заголовок «Государственные услуги» и описание', 3600);
    await point('', '.su-count');
    await say('Медицинская помощь', 'Только эта категория. Счётчик считается по фактическому перечню — 21 услуга', 4000);
    await point('Вызов врача на дом', '.su-row');
    await say('Строка услуги', 'Номер, наименование, краткое описание и значок перехода. При наведении меняется фон', 4200);
    await point('Прикрепление к поликлинике', '.su-row');
    await sleep(600);
    await say('Переход', 'Нажатие открывает услугу на eGov.kz в новой вкладке — как везде на портале', 3600);
  });

  await section('поиск', async () => {
    await type('.su-search input', 'справк', 140);
    await sleep(500);
    await say('Поиск по названию', 'Список фильтруется сразу при вводе, совпадения подсвечены', 3600);
    await point('', '.su-count');
    await say('Найдено', 'Счётчик обновляется: «5 из 21»', 2800);
    await click('', '.su-clear');
    await sleep(500);
    await say('Очистка', 'Крестик или Esc очищает поиск и возвращает полный перечень', 3400);
    await type('.su-search input', 'невозможно', 110);
    await sleep(600);
    await say('Ничего не найдено', '«По вашему запросу услуги не найдены» — с иконкой в центре блока', 4000);
    await page.keyboard.press('Escape');
    await sleep(600);
  });

  await section('загрузка', async () => {
    await say('Панель «Прототип»', 'Состояния, которые сложно поймать вживую, включаются здесь', 2600);
    await pp('Загрузка данных');
    await sleep(500);
    await say('Загрузка данных', 'Пока перечень загружается — skeleton-строки на месте услуг', 3600);
    await click('Загружен', '.pp-btn');
    await sleep(400);
    await click('Прототип', '.pp-head');
    await page.evaluate(() => window.scrollTo({ top: 0 }));
    await sleep(500);
  });

  await section('фото: аватар', async () => {
    await point('', '.cn-card');
    await say('Карточка пользователя', 'Фото ещё не загружено — стандартный аватар. Значок камеры — справа внизу', 4000);
    await point('', 'button.cn-ava');
    await sleep(700);
    await say('Наведение', 'Фото затемняется, камера выделяется цветом и появляется подсказка', 3600);
    await click('', 'button.cn-ava');
    await waitText('Изменение фото профиля', 4000);
    await sleep(500);
    await say('Изменение фото профиля', 'Окно поверх страницы с затемнением: предпросмотр, выбор файла, форматы и размер, «Отмена» и «Сохранить»', 5200);
    await point('', '.cn-hint');
    await say('Ограничения', 'JPG, JPEG, PNG, не более 5 МБ — окончательные согласуем с разработчиками', 3600);
  });

  await section('фото: ошибки формата и размера', async () => {
    await choose(PDF);
    await waitText('Неподдерживаемый формат', 4000);
    await say('Неверный формат', 'Понятное сообщение: какой формат нужен', 3200);
    await choose(BIG);
    await waitText('Файл больше 5 МБ', 4000);
    await say('Слишком большой файл', 'Сообщение с фактическим размером файла', 3200);
  });

  await section('фото: выбор и кадрирование', async () => {
    await choose(PHOTO);
    await waitText('citizen-photo.jpg', 4000);
    await sleep(400);
    await say('Предпросмотр', 'Фото сразу в круге, без искажения пропорций. Ошибка исчезла', 3600);
    const c = await center('.cn-pv');
    await at(c.x, c.y);
    await sleep(500);
    await page.mouse.down();
    for (let i = 1; i <= 8; i++) { await page.mouse.move(c.x, c.y + i * 2); await sleep(50); }
    await page.mouse.up();
    await sleep(300);
    const z = await center('.cn-zoom input');
    await at(z.x - z.w / 2 + 6, z.y);
    await sleep(400);
    await page.mouse.down();
    for (let i = 1; i <= 8; i++) { await page.mouse.move(z.x - z.w / 2 + 6 + i * 4, z.y); await sleep(60); }
    await page.mouse.up();
    await sleep(300);
    await say('Область фото', 'Фото можно сдвинуть мышью и приблизить ползунком — выбрать, как оно ляжет в круг', 4400);
  });

  await section('фото: сохранение', async () => {
    await say('Сохранение', 'Индикатор выполнения — прямо на фото и на кнопке', 1800);
    await click('Сохранить', '.cn-dlg-f button');
    await waitText('Фото профиля обновлено', 6000);
    await sleep(300);
    await say('Готово', 'Окно закрылось, новое фото — в карточке. ФИО и ИИН не меняются', 4000);
  });

  await section('фото: ошибка загрузки и отмена', async () => {
    await say('Ошибка загрузки', 'Включим в панели «Прототип» сбой сохранения', 2400);
    await pp('Ошибка загрузки');
    await click('Прототип', '.pp-head');
    await click('', 'button.cn-ava');
    await waitText('Изменение фото профиля', 4000);
    await sleep(400);
    await say('Повторная замена', 'Загруженное фото можно заменить в любой момент', 3000);
    await choose(PHOTO);
    await click('Сохранить', '.cn-dlg-f button');
    await waitText('Не удалось загрузить фотографию', 6000);
    await sleep(300);
    await say('Ошибка загрузки', 'Сообщение о невозможности загрузки; выбранное фото не теряется — можно сохранить ещё раз', 4400);
    await click('Отмена', '.cn-dlg-f button');
    await sleep(600);
    await say('Отмена', 'Ранее установленное фото остаётся без изменений', 3200);
    await page.evaluate(() => sessionStorage.removeItem('mp-avatar-scn'));
  });

  await card('Портал МЗ РК', 'Услуги и фото профиля', 'Фото обновляется во всех разделах кабинета. Интерфейс растягивается от ноутбука до монитора 27″.', 4600);
}
