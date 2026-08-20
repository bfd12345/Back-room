# The Back Room

Four-handed no-limit Texas hold'em against three bots with different
temperaments. One HTML file, no build step, no dependencies. Installs to a
phone home screen and plays offline.

**Play it:** bfd12345.github.io/back-room/

---

## The game

You start with 1,000 chips against three opponents, blinds 10/20.

| Seat | Style | Behaviour |
|---|---|---|
| Marguerite | Rock | Tight. When she raises, she has it. |
| Dez | Maniac | Wide, loud, bluffs often. |
| Sully | Station | Calls too much, raises rarely. |

Full no-limit rules: blinds, min-raise increments, all-ins, and correct side
pots when stacks differ. Bet sizing via a slider with ½ pot / ¾ pot / pot /
all-in presets. Keyboard shortcuts on desktop — `F` fold, `C` check-call,
`R` raise, `N` next hand.

## How the bots decide

Each decision runs a Monte Carlo equity estimate — a few hundred simulated
runouts of the current board against the live opponents — and weighs the result
against the pot odds being offered. Style then decides what to do with that
number: Marguerite needs a wide margin before she puts chips in, Dez will fire
on a hand that has no business betting.

The ledger down the right-hand side calls the action as it happens. At showdown
it reveals what each player's equity actually was, including when someone was
running a pure bluff.

The evaluator scores all 21 five-card combinations from seven cards. Sanity
checks against known values: AA wins 64% against three opponents and 85% heads
up; a set on a dry board sits around 93%.

## Running it

Clone and open `index.html`. That's the whole thing.

```bash
git clone https://github.com/YOUR-USERNAME/back-room.git
cd back-room
open index.html          # or double-click it
```

Opening the file directly won't offer the home screen install — that needs
HTTPS. See below.

## Deploying to GitHub Pages

Settings → Pages → Source: **Deploy from a branch** → `main` / `/ (root)` →
Save. Live in a minute or two at
`https://YOUR-USERNAME.github.io/back-room/`.

Then install it:

- **iPhone** — open in Safari, Share → Add to Home Screen
- **Android** — open in Chrome, ⋮ → Install app
- **Desktop** — install icon in the Chrome or Edge address bar

After the first load it runs with no connection at all.

## Files

```
index.html               game, styles, and logic in one file
manifest.webmanifest     name, icon, colours, standalone display
sw.js                    service worker — offline caching
icons/                   192 / 512 / 180 / maskable
.nojekyll                stops Pages running the files through Jekyll
```

## Notes

**Saved tables.** Chip stacks, hand number, and button position are written to
local storage at the start of each hand, so closing the app mid-session picks
up where you left off. "New table" clears it, as does busting out.

**Fonts.** Fraunces, Bitter, and JetBrains Mono load from Google Fonts and are
cached on first use. If the very first launch is offline the game still runs,
in fallback serif and mono.

**Updating.** After editing `index.html`, bump `SHELL` in `sw.js` from
`backroom-shell-v1` to `-v2`. Without that, installed copies keep serving the
cached old version.

## Licence

MIT — see [LICENSE](LICENSE).
