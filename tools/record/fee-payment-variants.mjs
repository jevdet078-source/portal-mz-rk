/**
 * Видео «Кабинет бизнеса — оплата госпошлины: два варианта способов оплаты» (для аналитика).
 *
 *   npm run record -- fee-payment-variants   → exports/video/18. Кабинет бизнеса — оплата госпошлины, два варианта.mp4
 *
 * Этап 2 «Оплата государственной пошлины» по замечаниям к дизайну блока оплаты: вместо «ПШЭП» —
 * полное название с логотипом e-pay, подписи под способами, «Сумма пошлины» для ПШЭП и «Сумма
 * к оплате» с плашкой «Комиссия банка 4% · …» для Halyk Bank. Вариант 1 — оба способа на выбор,
 * вариант 2 — только Halyk Bank. «Перейти к оплате» для обоих банков открывает страницу банка
 * в новой вкладке (интеграция — на стороне разработчиков), этап переходит в «Ожидается оплата».
 *
 * Панель прототипа в записи скрыта и переключается скриптом — субтитр говорит, что произошло.
 */

export const title = 'Кабинет бизнеса — оплата госпошлины: два варианта';
export const fileName = '18. Кабинет бизнеса — оплата госпошлины, два варианта';
export const start = 'Процесс.dc.html';

export default async function record(ctx) {
  const { page, sleep, say, title: card, click, point, open, section } = ctx;

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
    'Замечания к дизайну блока оплаты: полное название шлюза с логотипом, подписи под способами и блок суммы.', 6000);

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
    await say('Halyk Bank', '«Сумма к оплате» — 49 478 ₸, рядом плашка «Комиссия банка 4% · 1 903 ₸»', 5600);
  });

  await section('переход к оплате', async () => {
    await click('Перейти к оплате', 'button');
    await sleep(2200);
    await say('Ожидается оплата', 'Страница оплаты Halyk Bank открывается в новой вкладке. Вид и способ заблокированы, повторное нажатие откроет ту же ссылку', 6400);
    await sim('Оплачен');
    await say('Оплачено', 'Статус обновился по уведомлению банка: «Пошлина оплачена» и электронный чек, «Отправить» активна', 5600);
  });

  await section('вариант 2 · только Halyk Bank', async () => {
    await sim('Только Halyk Bank');
    await stage2();
    await click('На регистрацию', '[role="radio"]');
    await point('Способ оплаты', 'div');
    await say('Один способ', 'Выбирать нечего — способ показан карточкой без радиокнопки, сумма к оплате видна сразу', 6000);
    await click('Перейти к оплате', 'button');
    await sleep(2200);
    await say('Дальше — как в варианте 1', 'Страница банка в новой вкладке, статус платежа рядом с кнопкой, затем доверенность и «Отправить»', 5200);
  });

  await card('Портал МЗ РК · кабинет бизнеса', 'Оплата госпошлины: два варианта',
    'Вариант 1 — платежный шлюз и Halyk Bank, вариант 2 — только Halyk Bank. Переключатель «Способы» — на панели прототипа.', 5600);
}
