// One-Star Review of Something Essential — make.fun bounty
// u-0xb3e689-one-star-review-of-something-essential-c7234629.
//
// Writes one review to $MAKEFUN_OUTPUT_DIR/entry.txt (default /output/entry.txt).
// Standard library only: no network, no clock, no randomness, so every run
// writes the same bytes. No trailing newline is written.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OUT_DIR = process.env.MAKEFUN_OUTPUT_DIR || "/output";
const MAX_CHARS = 160;

// v2: a deadpan one-star review of gravity, with a tally and the turn in the last words.
const ENTRY =
  "Mondays: one star. Ordered a weekend, received this instead. It has arrived every " +
  "week since 1997 despite repeated cancellations. Seller does not respond.";

function fail(message: string): never {
  console.error("entry.txt rejected: " + message);
  process.exit(1);
}

// The gate: UTF-8 text of 1 to MAX_CHARS characters, not only white space.
const chars = Array.from(ENTRY).length;
if (chars < 1 || chars > MAX_CHARS) fail(`${chars} characters, limit is 1 to ${MAX_CHARS}`);
if (ENTRY.trim().length === 0) fail("only white space");
if (/[\r\n\t]/.test(ENTRY)) fail("holds a line break or a tab, the entry must be one line");
if (ENTRY !== ENTRY.trim()) fail("starts or ends with white space");
// Deadpan only: an exclamation mark would break the voice of the review.
if (ENTRY.includes("!")) fail("holds an exclamation mark, the review must stay deadpan");

mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(join(OUT_DIR, "entry.txt"), ENTRY, "utf8");
console.log(`entry.txt written: ${chars} characters, ${Buffer.byteLength(ENTRY, "utf8")} bytes`);
