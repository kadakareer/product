---
name: adhoc-speak
description: Read a reply aloud once through the existing Kokoro TTS engine, rewritten for listening. Use when the user asks to "read that aloud", "speak that", or "say it out loud" for a specific reply. One-off playback — not the per-session narration toggle (that's the `speak` skill).
---

Follows `.claude/docs/writing-style.md` for this file. The spoken text itself is the exception — it's prose, written for the ear.

## Not the narration toggle

- `speak` flips a session flag so the Stop hooks voice every turn.
- This skill voices one reply, once, and leaves the flag alone.
- If the flag got turned on by mistake, `rm -f ~/.claude/voice/enabled-sessions/$CLAUDE_CODE_SESSION_ID`.

## Steps

1. Pick the text — the reply the user pointed at, usually the last one
2. Rewrite it for listening (rules below)
3. Write it to a scratchpad file, not inline — avoids shell quoting
4. Play it: `"$HOME/.claude/voice/speak.sh" "$(cat <file>)"`
5. Confirm in `~/.claude/voice/server.log` — look for a `playing` line with the opening words
6. Report in one or two lines. Don't claim it was heard — the log only proves playback started.

## Rewrite rules

- Plain spoken sentences, first person, contractions fine
- Drop tables, bullets, headers, code, bold markers
- No file paths, IDs, or line numbers spoken — say the concept instead ("the engineering charter file")
- Turn a table into a sentence or two, or cut it if the prose already covers it
- Say lists as "one, two, three" — short ones only, five items max
- End with the open question or next step, stated so it stands alone
- Hard cap: 2000 characters. The engine cuts everything after that, silently — the ending is what gets lost.
- Check with `wc -c` before playing. Over the cap: trim, or split into two files and play them back to back.
- Longer turns: decision first, detail second.

## Engine

Local Kokoro server, started on demand, idles out after 20 minutes. Nothing to run or clean up.

## Reference

| What | Where |
|---|---|
| Wrapper script | `~/.claude/voice/speak.sh` |
| Server log | `~/.claude/voice/server.log` |
| Server address | `127.0.0.1:8765` |
| Voice name | `~/.claude/voice/voice-name.txt` |
| Model files | `~/.claude/voice/models/` |
| Engine source (symlinked) | `~/Dev/apps/april/voice/engine/` |
| Session flag (narration toggle) | `~/.claude/voice/enabled-sessions/` |
