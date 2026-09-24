# Наши компоненты в `project/`

Компоненты, перенесённые из Figma-библиотеки AlignUI v1.0 или собранные здесь.
Лежат рядом со страницами, в плоской структуре `project/`, — как того требует `dc-import`.

Смотреть: `node tools/serve.mjs` → открыть нужный файл из индекса.

## Перенесено из AlignUI

| Файл | Источник в Figma | Что внутри |
|---|---|---|
| [Toast.dc.html](../project/Toast.dc.html) | стр. `1927:49480`, `Alert & Notification & Toast [1.0]` — `3833:42072` | 5 статусов × 4 стиля × 3 размера. Принимает пропсы, без пропсов — витрина всех вариантов |
| [Table.dc.html](../project/Table.dc.html) | стр. `6139:29521` — Header Cell, Row Cell, Sorting Icons | Реестр заявок: сортировка, выделение строк, все типы ячеек, плотность 64/48 |
| [FileUpload.dc.html](../project/FileUpload.dc.html) | стр. `3502:36492` — Upload Area, Upload Cards, Format Icons | Зона загрузки (Default/Hover), карточки файлов (загрузка/успех/ошибка), 9 цветов форматов |
| [Dropdown.dc.html](../project/Dropdown.dc.html) | стр. `530:8059` — Dropdown Items, Misc Items | Меню действий (группы, горячие клавиши, disabled, опасное действие) и комбобокс с поиском |
| [DatePicker.dc.html](../project/DatePicker.dc.html) | стр. `3502:36491` — Date & Range Picker, Day Cells | Одиночная дата и диапазон с 8 пресетами периодов, русская локализация, неделя с понедельника |

Ассет: [`project/assets/file-page.svg`](../project/assets/file-page.svg) — форма страницы файла,
экспорт из `File Format Icons [1.0]`. Ссылки на ассеты Figma живут 7 дней, поэтому байты
сохранены локально.

В шапке каждого файла — комментарий с точными node-id источника и снятой геометрией
(отступы, радиусы, тени, роли типографики). При расхождении с Figma сверяться по нему.

## Общие компоненты портала

| Файл | Роль |
|---|---|
| [Header.dc.html](../project/Header.dc.html) | Шапка: герб, переключатель ролей, язык, вход. Вариант `variant="account"` |
| [Footer.dc.html](../project/Footer.dc.html) | Подвал |
| [Assistant.dc.html](../project/Assistant.dc.html) | Плавающий AI-помощник |

## Использование

Компонент подключается в страницу так же, как `Header`:

```html
<dc-import name="Toast" status="success" appearance="lighter" size="lg"
           title="Заявка отправлена" text="Номер 2024-ЛС-00417."
           link="Открыть заявку"></dc-import>
```

Пропсы приходят строками — в `renderVals()` читаются через `this.props`.
Флаги передаём как `"0"` / `"1"`.

Table, FileUpload, Dropdown и DatePicker сейчас собраны как **витрины с рабочей логикой**:
из них удобно копировать разметку в страницы и видеть все состояния разом. Когда какой-то
из них понадобится в двух и более местах — выносим в параметризуемый компонент, как Toast.

## Ещё не перенесено

В библиотеке AlignUI 1.0 этих компонентов нет — проектируем сами, когда понадобятся:

- `Stepper` / `Wizard` — есть только `Stepper Dot`, мастер подачи собираем из точек
- `Timeline` / `StatusHistory`
- `Drawer` / `SidePanel` — либо точечно забрать из библиотеки 2.0

Черновики, которые ждут выноса из существующих страниц:
`SegmentedControl`, `Chip`, `Stat`/KPI — см. `docs/06-backlog.md`.

## Правило про иконки

Все иконки — RemixIcon, имя без префикса в пропах компонентов DS, с префиксом `ri-` в разметке.
Имена слоёв в Figma совпадают с именами RemixIcon, но **не всегда**: в AlignUI иконка успеха
названа `select-box-circle-fill`, которой в RemixIcon 4.5 нет, — используем
`ri-checkbox-circle-fill` (тот же глиф). Перед использованием имя из Figma стоит проверять
по `https://cdn.jsdelivr.net/npm/remixicon@4.5.0/fonts/remixicon.css`.
