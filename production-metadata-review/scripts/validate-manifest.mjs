import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const stages = new Set(['preproduction', 'production', 'postproduction', 'delivery']);
const releasableRights = new Set(['cleared', 'licensed', 'synthetic']);

export function validateManifest(value) {
  const errors = [];
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return { releasable: false, errors: ['manifest must be a JSON object'] };
  }
  for (const key of ['title', 'project', 'stage', 'rights_status']) {
    if (typeof value[key] !== 'string' || !value[key].trim()) errors.push(`${key} is required`);
  }
  if (value.stage && !stages.has(value.stage)) errors.push(`stage must be one of: ${[...stages].join(', ')}`);
  if (value.rights_status === 'unknown') errors.push('rights_status=unknown is not releasable');
  if (value.rights_status && value.rights_status !== 'unknown' && !releasableRights.has(value.rights_status)) {
    errors.push(`rights_status must be one of: ${[...releasableRights].join(', ')}, unknown`);
  }
  return { releasable: errors.length === 0, errors };
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const input = process.argv[2];
  if (!input) {
    console.error(JSON.stringify({ releasable: false, errors: ['Usage: validate-manifest.mjs <manifest.json>'] }));
    process.exit(2);
  }
  try {
    const result = validateManifest(JSON.parse(readFileSync(input, 'utf8')));
    console.log(JSON.stringify(result));
    process.exit(result.releasable ? 0 : 1);
  } catch (error) {
    console.error(JSON.stringify({ releasable: false, errors: [`Invalid JSON: ${error.message}`] }));
    process.exit(2);
  }
}
