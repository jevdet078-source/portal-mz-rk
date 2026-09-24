# Портал Министерства здравоохранения Республики Казахстан

Единый портал МЗ РК: услуги для граждан, бизнеса и медперсонала, личные кабинеты,
AI-помощник. Дизайн сделан в Claude Design, дальше дорабатывается здесь.

## Быстрый старт

```bash
node tools/serve.mjs
```

→ `http://localhost:5173` — список всех страниц-прототипов.

`.dc.html` не открываются через `file://` — нужен локальный сервер.
Для «показать без запуска» есть самодостаточные копии в `exports/standalone-html/`.

Посмотреть дизайн-систему вживую: `design-system/preview/Clinic Portal (standalone).html`
(открывается двойным кликом), эталоны — `design-system/guidelines/*.card.html`.

## Структура

```
project/           прототипы Claude Design (.dc.html) — источник правды
design-system/     AlignUI DS: 29 компонентов (.jsx + .d.ts), токены, гайдлайны
docs/              документация проекта
exports/           самодостаточные HTML-сборки
_incoming/         перевалочная папка для входящих архивов
tools/             serve.mjs
```

## Документация

| Документ | О чём |
|---|---|
| [docs/01-overview.md](docs/01-overview.md) | обзор продукта и техконтекста |
| [docs/02-pages.md](docs/02-pages.md) | карта всех страниц: что готово, чего нет |
| [docs/03-design-system.md](docs/03-design-system.md) | дизайн-система: что есть и каких компонентов не хватает |
| [docs/03a-component-api.md](docs/03a-component-api.md) | типизированный API 29 компонентов AlignUI |
| [docs/04-dc-format.md](docs/04-dc-format.md) | как устроен и как правится формат `.dc.html` |
| [docs/05-pharma-integration.md](docs/05-pharma-integration.md) | план объединения портала с системой заявок на ЛС/МИ |
| [docs/06-backlog.md](docs/06-backlog.md) | бэклог |
| [docs/07-figma-pickup.md](docs/07-figma-pickup.md) | чек-лист забора компонентов из Figma |
| [docs/08-components.md](docs/08-components.md) | наши компоненты в `project/`: что перенесено и как применять |

[CLAUDE.md](CLAUDE.md) — правила работы над проектом.
