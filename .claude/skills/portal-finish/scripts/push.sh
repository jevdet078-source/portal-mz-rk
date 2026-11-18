#!/usr/bin/env bash
# git push от имени jevdet078-source через Git Credential Manager (в обход gh-хелпера песочницы).
#   bash .claude/skills/portal-finish/scripts/push.sh -u origin feature/<ветка>
#   bash .claude/skills/portal-finish/scripts/push.sh origin main
set -e
exec git -c credential.https://github.com.helper= -c credential.https://github.com.helper=manager push "$@"
