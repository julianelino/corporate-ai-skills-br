import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

export const root = fileURLToPath(new URL('../', import.meta.url));
export const text = (path) => readFileSync(join(root, path), 'utf8');
export const json = (path) => JSON.parse(text(path));
export function files(directory, matcher) {
  const start = join(root, directory);
  const walk = (path) => readdirSync(path, { withFileTypes: true }).flatMap((entry) => {
    if (entry.name === '.git' || entry.name === 'node_modules' || entry.name === '__pycache__') return [];
    const entryPath = join(path, entry.name);
    return entry.isDirectory() ? walk(entryPath) : matcher(entry.name, entryPath) ? [entryPath] : [];
  });
  return walk(start);
}
export function fail(messages) {
  if (messages.length) { console.error(messages.join('\n')); process.exit(1); }
}
