# Формат `.dc.html` — как устроены прототипы

Claude Design хранит прототип как один HTML-файл с разметкой-шаблоном и логикой на React.
Рендерит его `support.js` (dc-runtime), который на лету подтягивает
React 18 + ReactDOM + Babel standalone с unpkg.

## Скелет файла

```html
<!DOCTYPE html>
<html><head>
  <meta charset="utf-8">
  <script src="./support.js"></script>   <!-- рантайм -->
</head><body>
<x-dc>                                   <!-- ← разметка -->
  <helmet>
    <link href="…Inter…" rel="stylesheet">
    <link href="…remixicon@4.5.0…" rel="stylesheet">
    <style> :root{ --primary:#4D42E9; … } </style>
  </helmet>

  <div>…вёрстка с плейсхолдерами {{ … }}…</div>

  <template id="__bundler_thumbnail" data-bg-color="#4D42E9">…</template>
</x-dc>

<script type="text/x-dc" data-dc-script data-props='{"$preview":{"width":1440,"height":70}}'>
class Component extends DCLogic {          // ← логика
  state = { tab: 'overview' };
  renderVals(){ return { /* ключи → {{ ключ }} в разметке */ }; }
}
</script>
</body></html>
```

## Шаблонизация

| Конструкция | Смысл |
|---|---|
| `{{ имя }}` | подстановка значения из объекта, который вернул `renderVals()` |
| `<sc-if value="{{ flag }}">…</sc-if>` | условный рендер; `hint-placeholder-val="{{ true }}"` — что показать в редакторе |
| `<sc-for list="{{ arr }}" as="x">…{{ x.label }}…</sc-for>` | цикл; `hint-placeholder-count="3"` — сколько элементов рисовать в редакторе |
| `<dc-import name="Header" hint-size="100%,70px">` | вставка компонента из соседнего `Header.dc.html` |
| `onClick="{{ handler }}"` | функция из `renderVals()` |
| `style="{{ t.style }}"` | стиль строкой, собранной в JS |
| `<image-slot>` | слот под изображение (рантайм `image-slot.js`, состояние в `.image-slots.state.json`) |

## Логика

`class Component extends DCLogic` — обычный React-компонент:
`state`, `setState`, `componentDidMount`, `React.createRef()` доступны.
Главное отличие — вместо `render()` пишется **`renderVals()`**, возвращающий плоский объект.
Всё, что должно попасть в разметку (значения, массивы, строки стилей, обработчики),
собирается там.

Типичный приём — вычислять инлайн-стили в JS, потому что CSS-классов почти нет:

```js
const tabs = data.map(t => ({
  ...t,
  onClick: () => this.setState({ tab: t.id }),
  style: `padding:9px 18px;border-radius:9px;${s.tab===t.id
    ? 'background:#4D42E9;color:#fff;'
    : 'background:transparent;color:#525866;'}`,
}));
```

## Состояние между страницами

Отдельного роутера нет — переходы это обычные `<a href="Другая страница.dc.html">`.
Общее состояние живёт в `localStorage`:

| Ключ | Значение | Кто пишет / читает |
|---|---|---|
| `mp-role` | `citizens` / `business` / `medical` | `Header` ↔ главная |
| `mp-lang` | `ҚАЗ` / `РУС` / `ENG` | `Header` |
| `mp-iin` | ИИН после входа | `Вход` |
| `mp-profile` | `citizen` / `business` / `medical` / `gov` | `Вход` |
| `mp-biz-step` | `1` / `2` / `3` / `done` — шаг онбординга «Единого окна» | `Кабинет бизнеса` ↔ `BusinessNav` (событие `mp-biz-step-change`) |
| `mp-biz-role` | `applicant` / `admin` — роль в организации внутри кабинета бизнеса | `Header` (переключатель) ↔ `BusinessNav`, `Рабочий календарь` (событие `mp-biz-role-change`) |
| `mp-pending-service` | `price-ls` / `price-mi` — услуга, ради которой организация начала подготовку (договор, платёж) | `Паспорт услуги` → `Кабинет бизнеса`, `Платежи`; сбрасывает `Заявка на регистрацию цены` |
| `mp-price-ls`, `mp-price-mi` | `pending` / `ok` / `no` — отправленная заявка на регистрацию цены (+ `mp-price-<id>-at` — дата отправки) | `Заявка на регистрацию цены` → `Услуги` |
| `mp-knf` | `pending` / `invoice` / `done` — этап отправленного заявления КНФ (+ `mp-knf-at` — дата отправки) | `Заявление КНФ` → `Услуги` |
| `mp-notif-read` | JSON-массив номеров прочитанных уведомлений | `Уведомления` ↔ `Header` (событие `mp-notif-change`) |
| `mp-proc-ls`, `mp-proc-mi` | `p1` / `p2` / `p3` / `p45` / `done` — этап сквозного процесса в прототипе | `Процесс` → `Мои процессы` |

Синхронно смена роли рассылается событием:
`window.dispatchEvent(new CustomEvent('mp-role-change', { detail: id }))`.

Внутристраничная навигация по разделам — через `location.hash`
(`Паспорт услуги.dc.html#cert-pharma`, `Клинические протоколы.dc.html#standards`)
с подпиской на `hashchange`.

## Запуск

```bash
node tools/serve.mjs        # http://localhost:5173
```

`file://` не работает: `dc-import` подтягивает соседние файлы через `fetch()`.

## Выгрузка для коллег

```bash
node tools/export.mjs       # → exports/portal-mz-rk/ и exports/portal-mz-rk.zip
```

Сборка открывается двойным кликом («00 — Открыть прототип.html»), без сервера и интернета.
Все `.dc.html` кладутся в `runtime/files.js`, а `window.fetch` отдаёт их из памяти;
React, Inter и RemixIcon подключаются локально (скачиваются один раз в `tools/.cache`).
Имена страниц не меняются, поэтому ссылки, `?query` и `#hash` работают как на сервере.
Смотреть в Chrome / Edge: Firefox не делит `localStorage` между локальными файлами.

## Правила при доработке

- Новая страница = новый `project/<Название>.dc.html` рядом с остальными, **без подпапок**.
- Шапку/подвал/ассистента подключать через `dc-import`, не копировать вёрстку.
- Цвета брать из `:root`-блока (он есть в каждом файле) — руками хексы не вбивать.
- Иконки — `ri-*-line` / `ri-*-fill`, размеры 18 / 20 / 22–24 px.
- Ссылки между страницами — относительные, с русскими именами файлов как есть.
