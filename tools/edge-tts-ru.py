"""
edge-tts с явным русским языком в SSML (xml:lang='ru-RU' вместо en-US).

Многоязычный голос fr-FR-RemyMultilingualNeural с ноября 2026 на части русских фраз
отвечает «No audio was received»; с указанием языка эти фразы проходят.
Запускается из tools/record.mjs как запасной вариант:

    uvx --with edge-tts python -I tools/edge-tts-ru.py <голос> <текст> <файл.mp3>
"""
import asyncio
import sys

import edge_tts
from edge_tts import communicate as _c

_orig = _c.mkssml


def _ru(tc, escaped_text):
    return _orig(tc, escaped_text).replace("xml:lang='en-US'", "xml:lang='ru-RU'", 1)


_c.mkssml = _ru


async def _main(voice, text, out):
    await edge_tts.Communicate(text, voice).save(out)


if __name__ == '__main__':
    asyncio.run(_main(sys.argv[1], sys.argv[2], sys.argv[3]))
