# Дизайн-система AlignUI — что есть, чего не хватает

## Где лежит

`design-system/` — полная выгрузка **AlignUI Design System v1.0** из Claude Design
(та же DS, что в EGMIS и egmis-patient). Это **исходники**, а не сборка:

```
design-system/
├─ components/          29 примитивов: <Name>.jsx + <Name>.d.ts + <group>.card.html
├─ tokens/              fonts / primitives / typography / shadows / spacing
├─ styles.css           точка входа, только @import
├─ guidelines/          12 эталонных карточек (цвет, типографика, отступы, радиусы,
│                       тени, иконография, лого)
├─ ui_kits/medical-portal/   собранный кабинет клиники на этих примитивах
├─ templates/clinic-portal/  шаблон дашборда
├─ assets/logos/        SVG-марки (плейсхолдер «Apex» из оригинального файла)
├─ preview/             Clinic Portal (standalone).html — открыть двойным кликом
├─ _ds_bundle.js        рантайм-сборка → window.AlignUIDesignSystem_6ff166
├─ _ds_manifest.json    манифест: компоненты, карточки, 141 токен
├─ tokens.index.json    те же токены в плоском JSON
├─ SKILL.md             инструкция дизайн-системы для агента
└─ readme.md            дизайн-гайд AlignUI (правила, тон, визуальный язык)
```

Копия рантайм-сборки лежит ещё в `project/_ds/…/` — её читает Claude Design.
Обе копии синхронизированы; при новой выгрузке обновлять обе.

## Токены — полный набор

| Файл | Что внутри |
|---|---|
| `tokens/primitives.css` | 8 акцентных семейств (blue/green/teal/orange/yellow/red/purple/pink) × 5 ступеней (`base/dark/darker/light/lighter`), нейтрали 0–900, семантические алиасы (`--bg-*`, `--text-*`, `--stroke-*`, `--icon-*`, `--state-*`), радиусы. Тема `:root[data-mode="purple"]`. |
| `tokens/typography.css` | Inter / Inter Display, 4 роли (Title 20→56, Label, Paragraph 12/14/16/18/24, Subheading UPPERCASE) + utility-классы `.text-title-h1` … `.text-subheading-2xs`. |
| `tokens/shadows.css` | `--shadow-xs…2xl`, `--shadow-tooltip`, `--shadow-toggle`, `--shadow-card`, фокус-кольца `--ring-primary/error/neutral`. |
| `tokens/spacing.css` | Шаг 4px: `--space-0…40`; радиусы `--r-4…24`, `--r-full`. |

### Прототипы дублируют токены руками

Каждая страница портала объявляет свой `:root { --primary:#4D42E9; --n100:#F6F8FA; … }`.
Значения **совпадают с токенами DS один в один**, но связи нет:

| В прототипе | Токен AlignUI | Значение |
|---|---|---|
| `--primary` | `--primary-base` / `--blue-base` | `#4D42E9` |
| `--primary-dark` | `--blue-dark` | `#362DA6` |
| `--primary-darker` | `--blue-darker` | `#312D86` |
| `--primary-light` | `--blue-light` | `#C6D0FF` |
| `--primary-lighter` | `--blue-lighter` | `#EEF2FF` |
| `--n0 … --n900` | `--neutral-0 … --neutral-900` | `#FFFFFF … #0A0D14` |
| `--stroke` | `--stroke-soft-200` | `#E2E4E9` |
| `--bg` | `--bg-weak-100` | `#F6F8FA` |
| `--green` / `--green-l` / `--green-d` | `--green-base / -lighter / -darker` | `#38C793` / `#EFFAF6` / `#176448` |
| `--teal`, `--orange`, `--yellow`, `--red`, `--purple`, `--pink` (+ `-l`) | `--<цвет>-base` / `-lighter` | см. `tokens/primitives.css` |

**Расхождение — тени.** В прототипах `--sh-md:0 8px 16px rgba(10,13,20,.06)`,
в DS `--shadow-md:0 16px 32px -12px rgba(14,18,27,.10)`. При приведении к DS сверить руками.

## Компоненты — 29 примитивов

| Группа | Компоненты |
|---|---|
| Кнопки | `Button`, `FancyButton`, `IconButton`, `LinkButton` |
| Формы | `Input`, `Textarea`, `Select`, `Checkbox`, `Radio`, `Switch`, `Label`, `Hint` |
| Обратная связь | `Alert`, `Badge`, `Banner`, `ProgressBar`, `StatusBadge`, `Tag`, `Tooltip` |
| Данные | `Avatar`, `AvatarGroup`, `Card`, `Divider`, `Tabs`, `Accordion`, `Breadcrumbs`, `Pagination`, `Rating`, `Modal` |

Типизированный API каждого — `docs/03a-component-api.md`.

## ⚠️ Чего в дизайн-системе по-прежнему НЕТ

Выгрузка с исходниками закрыла вопрос с кодом компонентов, но **новых компонентов
в ней не появилось** — те же 29. Перечисленное ниже в AlignUI отсутствует,
и для флоу подачи заявок на ЛС/МИ и АРМ эксперта это придётся проектировать здесь.

**Критично — без этого не собрать подачу заявки и АРМ:**

| Компонент | Где нужен |
|---|---|
| **Table / DataTable** (сортировка, фильтры, выделение строк, пустое состояние) | реестр заявок, АРМ эксперта, история отчислений, список медорганизаций |
| **Stepper / Wizard** (шаги + прогресс + навигация) | подача заявки на ЛС/МИ |
| **FileUpload / Dropzone** + **FileCard** | пакет документов к заявке |
| **DatePicker** / **DateRange** | сроки, даты регистрации, фильтры реестра |
| **Toast** (очередь, автоскрытие) | подтверждения действий |
| **Timeline / StatusHistory** | история рассмотрения заявки, диспансерный учёт |
| **Drawer / SidePanel** | карточка заявки в АРМ без ухода со списка |
| **Combobox / Autocomplete** | выбор МНН, организации, вида деятельности |
| **DropdownMenu / Popover** | меню действий по строке реестра, меню профиля |

**Желательно:** `Skeleton`, `EmptyState`, `Stat/KPI`, `Segmented control`, `Chip/FilterChip`,
`NumberInput`, `Tree`, `PageSizeSelect`.

**Как закрываем:** проектируем недостающее здесь, как `.dc.html`-компоненты в `project/`,
по правилам AlignUI (токены, радиусы, тени, фокус-кольца из `tokens/`).
Часть уже де-факто свёрстана инлайном в прототипах и просто выносится в компонент:
KPI-карточки и таблицы — в `Кабинет врача.dc.html`, тост — в `Личный кабинет.dc.html`,
сегмент-контрол — на главной и в каталоге услуг.

## Прочие пробелы

- `assets/logos/` содержит только плейсхолдер «Apex» из оригинального Figma-файла.
  **Герба РК в векторе нет** — сейчас это `project/uploads/images.jpg`. Нужен SVG.
- Брейкпоинтов и правил адаптива в DS нет; портал свёрстан только под 1440.
