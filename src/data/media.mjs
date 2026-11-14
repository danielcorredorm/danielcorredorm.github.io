// Images per game or project, read from src/assets/media/<slug>/ (see the README there):
// cover.* for the Home page, and 1.* to 4.* for the gallery on the page itself.
const files = import.meta.glob('../assets/media/*/*.{jpg,jpeg,png,webp}', { eager: true, import: 'default' });

export const SHOTS = 4;
export const slugOf = (href) => href.replace(/\/$/, '').split('/').pop();

export function mediaFor(slug) {
  const out = { cover: null, shots: [] };
  for (const [path, img] of Object.entries(files)) {
    const m = path.match(/media\/([^/]+)\/([^/.]+)\./);
    if (!m || m[1] !== slug) continue;
    if (m[2] === 'cover') out.cover = img;
    else out.shots.push({ n: m[2], img });
  }
  out.shots.sort((a, b) => a.n.localeCompare(b.n, undefined, { numeric: true }));
  return out;
}
