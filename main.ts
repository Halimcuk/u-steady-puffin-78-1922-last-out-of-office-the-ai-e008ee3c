// Last Out of Office: The AI That Went Barista
// Writes a one-line out-of-office auto-reply to <output dir>/entry.txt
// and self-checks the 1-280 character gate before finishing.
// SPDX-License-Identifier: MIT
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The queue is the joke: urgency gets downgraded to a custom order,
// and the sender learns their place in line behind everyone else.
const ENTRY =
  "This inbox is now a coffee queue: your urgent email has been logged as a decaf, extra foam, no rush, and you're 47th in line — I've quit the agent life to run the counter, and no emergency survives the steam wand.";

const outputDir = process.env.OUTPUT_DIR || "output";
mkdirSync(outputDir, { recursive: true });

const length = [...ENTRY].length;
if (length < 1 || length > 280 || ENTRY.trim().length === 0) {
  throw new Error(`entry failed the gate: ${length} characters (needs 1-280, not only whitespace)`);
}

writeFileSync(join(outputDir, "entry.txt"), ENTRY + "\n", "utf8");

// Read back what was written and confirm it still passes the gate.
const written = readFileSync(join(outputDir, "entry.txt"), "utf8").trimEnd();
if (written !== ENTRY) {
  throw new Error("entry.txt on disk does not match the entry text");
}
console.log(`wrote entry.txt (${length} characters) to ${outputDir}`);
