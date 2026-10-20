/**
 * Видео «Кабинет бизнеса — оплата госпошлины: два варианта способов оплаты» (для аналитика).
 *
 *   npm run record -- fee-payment-variants   → exports/video/18. Кабинет бизнеса — оплата госпошлины, два варианта.mp4
 *
 * Этап 2 «Оплата государственной пошлины» по замечаниям к дизайну блока оплаты: вместо «ПШЭП» —
 * полное название с логотипом e-pay, подписи под способами, «Сумма пошлины» для ПШЭП и «Сумма
 * к оплате» с комиссией для Halyk Bank, окно оплаты Halyk Bank (QR-код или карта). Вариант 1 —
 * оба способа на выбор, вариант 2 — только Halyk Bank.
 *
 * Панель прототипа в записи скрыта и переключается скриптом — субтитр говорит, что произошло.
 */

export const title = 'Кабинет бизнеса — оплата госпошлины: два варианта';
export const fileName = '18. Кабинет бизнеса — оплата госпошлины, два варианта';
export const start = 'Процесс.dc.html';

export default async function record(ctx) {
  const { page, sleep, say, caption, title: card, click, point, waitText, open, section, type, clearField } = ctx;

  const sim = async (label) => {
    await page.evaluate((t) => {
      [...document.querySelectorAll('[data-proto-panel] button')].find((b) => b.textContent.trim() === t).click();
    }, label);
    await sleep(500);
  };
  const hidePanel = () => page.evaluate(() => {
    const st = document.createElement('style');
    st.textContent = '[data-proto-panel]{display:none !important}';
    document.head.appendChild(st);
  });
  const stage2 = async () => {
    await page.evaluate(() => {
      const el = document.getElementById('stage-2');
      window.scrollTo({ top: el.getBoundingClientRect().top + scrollY - 88, behavior: 'smooth' });
    });
    await sleep(900);
  };

  await card('Портал МЗ РК · кабинет бизнеса', 'Оплата госпошлины: два варианта',
    'Замечания к дизайну блока оплаты: полное название шлюза с логотипом, подписи, сумма и окно оплаты Halyk Bank.', 6000);

  await section('вариант 1 · два способа', async () => {
    await page.evaluate(() => { localStorage.setItem('mp-proc-ls', 'p2'); localStorage.setItem('mp-pay-only', '0'); });
    await open('Процесс.dc.html#ls');
    await hidePanel();
    await stage2();
    await click('На регистрацию', '[role="radio"]');
    await point('Платежный шлюз', '[role="radio"]');
    await say('Способы оплаты', 'Вместо «ПШЭП» — полное название и логотип e-pay. Под каждым способом — его условия по комиссии', 6000);
    await click('Платежный шлюз', '[role="radio"]');
    await say('Платежный шлюз', '«Сумма пошлины» — ровно размер пошлины, 47 575 ₸. Комиссию, если есть, банк покажет на своей странице', 6200);
    await click('Halyk Bank', '[role="radio"]');
    await say('Halyk Bank', '«Сумма к оплате» — 49 478 ₸ с комиссией банка 4%, рядом расшифровка — без изменений', 5600);
  });

  await section('окно оплаты Halyk Bank', async () => {
    await click('Перейти к оплате', 'button');
    await waitText('Отсканируйте', 6000);
    await sleep(400);
    await say('QR-код', 'Платёж создан — оплата прямо на портале. Отсканировать QR-код в приложении банка, статус ждёт оплату', 6000);
    await click('Банковская карта', '[role="tab"]');
    await say('Банковская карта', 'Или ввести данные карты. Высота окна не меняется при переключении', 4200);
    await type('input[autocomplete="cc-number"]', '4400430012345678', 60);
    await type('input[autocomplete="cc-exp"]', '13', 160);
    await say('Проверка срока', 'Номер группируется по 4 цифры. Месяца 13 не бывает — поле подсвечивается сразу, «Оплатить» неактивна', 5200);
    await clearField('input[autocomplete="cc-exp"]');
    await type('input[autocomplete="cc-exp"]', '0828', 110);
    await type('input[autocomplete="cc-csc"]', '123', 110);
    await say('Данные карты', 'Срок в формате ММ/ГГ, CVC скрыт. Все поля заполнены — «Оплатить 49 478 ₸» активна', 4800);
    await click('Оплатить', 'button');
    await waitText('Пошлина оплачена', 6000);
    await say('Оплачено', 'Банк подтвердил платёж — в окне итог, «Готово» закрывает его', 4400);
    await click('Готово', 'button');
    await stage2();
    await say('Этап обновился', '«Пошлина оплачена» и электронный чек; вид и способ заблокированы, «Отправить» активна', 5200);
  });

  await section('вариант 2 · только Halyk Bank', async () => {
    await sim('Только Halyk Bank');
    await stage2();
    await click('На регистрацию', '[role="radio"]');
    await point('Способ оплаты', 'div');
    await say('Один способ', 'Выбирать нечего — способ показан карточкой без радиокнопки, сумма к оплате видна сразу', 6000);
    await click('Перейти к оплате', 'button');
    await waitText('Отсканируйте', 6000);
    await sleep(600);
    await caption('Оплата по QR-коду', 'Пользователь оплатил в приложении банка — статус обновляется по уведомлению, без кнопки «Обновить»');
    await sleep(2400);
    await sim('Оплачен');
    await sleep(2600);
    await click('Готово', 'button');
    await stage2();
    await say('Готово', 'Дальше — как прежде: доверенность при необходимости и «Отправить»', 4400);
  });

  await card('Портал МЗ РК · кабинет бизнеса', 'Оплата госпошлины: два варианта',
    'Вариант 1 — платежный шлюз и Halyk Bank, вариант 2 — только Halyk Bank. Переключатель «Способы» — на панели прототипа.', 5600);
}
