import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { validateManifest } from './production-metadata-review/scripts/validate-manifest.mjs';

assert.deepEqual(validateManifest({ title: 'A', project: 'P', stage: 'delivery', rights_status: 'cleared' }), { releasable: true, errors: [] });
assert.equal(validateManifest({ title: 'A', project: 'P', stage: 'delivery', rights_status: 'unknown' }).releasable, false);
const pass = spawnSync(process.execPath, ['production-metadata-review/scripts/validate-manifest.mjs', 'production-metadata-review/fixtures/releasable.json'], { encoding: 'utf8' });
assert.equal(pass.status, 0);
assert.match(pass.stdout, /"releasable":true/);
const blocked = spawnSync(process.execPath, ['production-metadata-review/scripts/validate-manifest.mjs', 'production-metadata-review/fixtures/blocked.json'], { encoding: 'utf8' });
assert.equal(blocked.status, 1);
assert.match(blocked.stdout, /unknown is not releasable/);
console.log('production metadata review skill tests: PASS');
