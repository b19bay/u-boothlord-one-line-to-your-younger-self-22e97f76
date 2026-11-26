import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "Keep the letter from Dad in your wallet; one day you'll wish you'd memorized the part about the boat.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  console.error("MAKEFUN_OUTPUT_DIR is not set");
  process.exit(1);
}
if (LINE.length < 1 || LINE.length > 200) {
  console.error(`line must be 1-200 characters, got ${LINE.length}`);
  process.exit(1);
}
if (LINE.trim().length === 0 || LINE.includes("\n")) {
  console.error("line must be a single non-blank line");
  process.exit(1);
}
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
// Read back and verify: the file on disk must be byte-identical to the
// line, exactly 101 characters, one line, no trailing newline.
const written = readFileSync(join(outDir, "entry.txt"), "utf8");
if (written !== LINE || written.length !== 101) {
  console.error("read-back mismatch: entry.txt does not match the line");
  process.exit(1);
}
