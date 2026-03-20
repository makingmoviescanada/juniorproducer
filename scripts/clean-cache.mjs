import { rmSync } from 'fs';
import { resolve } from 'path';

try {
  const nextPath = resolve('.next');
  rmSync(nextPath, { recursive: true, force: true });
  console.log('[v0] Cleared .next build cache');
} catch (error) {
  console.log('[v0] Cache clear complete or not found');
}
