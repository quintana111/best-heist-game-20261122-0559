// Velvet Silence — best-heist-game-20261122-0559 (Node 22, standard library only).
//
// The entry hands in this directory's game/ folder: plain static files a
// desktop browser loads offline (game/index.html, inline CSS + JS, no library
// and no network request), plus 3-4 screenshots in screenshots/. This program
// copies both folders beside itself into the output directory and writes
// /output/dossier.json, the summary the judge reads, using the vendored
// make.fun game library (vendor/makefun-game.ts, copied from the kit).
//
// Every path is resolved from this file's own directory, never from the
// working directory: the grader may run it from anywhere. Outside the
// grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { cpSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-game.ts';

// Directory holding this file (and therefore game/ and screenshots/).
const here = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(outDir, { recursive: true });

// Hand in the game exactly as it sits beside this file.
cpSync(join(here, 'game'), join(outDir, 'game'), { recursive: true });

// Screenshots are optional on disk but expected for this entry; copy them
// when present so a missing folder never breaks the hand-in.
if (existsSync(join(here, 'screenshots'))) {
  cpSync(join(here, 'screenshots'), join(outDir, 'screenshots'), { recursive: true });
}

// The scorer's caps: text_max_bytes shapes the dossier bytes; the rest refuse
// an entry the scorer would refuse (more than 4 screenshots or one over
// 256 KiB; more than 993 files in game/ or 48 MiB of game files in all, or a
// path under game/ over 1000 bytes).
const dossier = buildDossier(outDir, {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  game_max_files: 993,
  game_max_bytes: 50331648,
  game_path_max_bytes: 1000,
});
writeFileSync(join(outDir, 'dossier.json'), dossier);

// One line of proof the hand-in is complete: dossier bytes + where it went.
console.log(`velvet-silence: dossier.json (${dossier.length} bytes) written to ${outDir}`);
