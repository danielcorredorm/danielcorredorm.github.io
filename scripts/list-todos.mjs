// Lists every draft note left in the site (class="todo" or TODO comments).
// Run `npm run todos` before publishing: the list should be empty.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = new URL('../src', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');
const hits = [];
const walk = (dir) => {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p);
    else if (/\.(astro|md|mdx|mjs)$/.test(name)) {
      readFileSync(p, 'utf8').split('\n').forEach((line, i) => {
        if (/class="todo"|TODO/.test(line)) hits.push(`${relative(root, p)}:${i + 1}  ${line.trim().slice(0, 140)}`);
      });
    }
  }
};
walk(root);
console.log(hits.length ? hits.join('\n') : 'No draft notes left.');
console.log(`\n${hits.length} pending`);
