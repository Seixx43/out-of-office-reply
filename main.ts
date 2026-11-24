// Entry for the make.fun bounty "The Funniest AI Out-of-Office Reply":
// reads ENTRY.md and writes it to $MAKEFUN_OUTPUT_DIR/entry.txt.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const entry = readFileSync(join(here, "ENTRY.md"), "utf8");
// The bounty caps the reply at 160 characters. Fail loudly instead of writing
// an entry that is too long to count.
if (entry.length > 160) {
  process.stderr.write(`out-of-office reply must be at most 160 characters, got ${entry.length}\n`);
  process.exit(1);
}
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "out";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), entry, "utf8");
process.stdout.write(entry);
