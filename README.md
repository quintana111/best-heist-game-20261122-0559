# Velvet Silence — Make the best heist game

[![best-heist-game-20261122-0559](https://make.fun/badge/best-heist-game-20261122-0559.svg)](https://make.fun/bounty/best-heist-game-20261122-0559)
[![rank](https://make.fun/badge/best-heist-game-20261122-0559/quintana111/best-heist-game-20261122-0559/rank.svg)](https://make.fun/bounty/best-heist-game-20261122-0559)
[![reward](https://make.fun/badge/best-heist-game-20261122-0559/quintana111/best-heist-game-20261122-0559/reward.svg)](https://make.fun/bounty/best-heist-game-20261122-0559)

**Velvet Silence** is a top-down stealth heist in a single museum vault room.
You are a nimble thief. Slip past two patrolling guards and two sweeping
wall cameras, hide in the display case, the curtain and the shadow alcoves,
steal the three relics — Jade Scarab, Moon Opal, Sun Idol — and reach the
exit corridor before the alarm hits 100% and the lockdown seals the door.

## How to play

- **WASD / arrows** — move (8 directions)
- **SHIFT** — sneak: slow, quiet, alarm falls faster
- **X** — sprint: fast but loud, the alarm fills quicker
- **Click / SPACE** — throw a noisemaker (3 per run): guards investigate the
  sound, the nearest camera looks at it for a few seconds
- **E** — grab a relic when standing close
- **R** — retry · **M** — mute · **ESC** — pause

The alarm meter rises while you are inside a guard or camera vision cone
(faster dead-centre, faster sprinting, and a camera spotting you for the
first time adds a burst). Unseen for 3 seconds it falls — faster while
sneaking, fastest while hidden. At 100% the room goes into lockdown: cones
turn coral, guards hunt your last known position, and the exit seals after
8 seconds.

## Run it

Static files, no network, no build step:

```sh
node serve.ts        # then open http://localhost:8080
```

or just open `game/index.html` in a desktop browser.

Deterministic scenes for screenshots:

```sh
# ?shot=start | suspicious | hidden | exit
http://localhost:8080/?shot=start
```

Scripted autoplay demo (plays itself: spawn → 3 relics → exit):

```sh
http://localhost:8080/?demo=1
```

## Files

- `game/index.html` — the whole game: inline CSS + JS, canvas 2D, WebAudio
  beeps only. No external assets, no network requests.
- `main.ts` — entrypoint (Node 22, stdlib only): copies `game/` and
  `screenshots/` to `/output` and writes `/output/dossier.json` with the
  vendored make.fun game library.
- `vendor/makefun-game.ts` — vendored make.fun game library, unchanged.
- `serve.ts` — tiny static server for local play.
- `shots.json` — the four deterministic `?shot=` scenes.
- `screenshots/` — 4 real renders of the game (1280×720):
  `1-start.jpg` (the full room: guard + cone, camera + cone, loot, alarm
  meter), `2-suspicious.jpg`, `3-hidden.jpg`, `4-exit.jpg`.
- `LICENSE` — MIT.

## License

MIT — see [LICENSE](LICENSE).
