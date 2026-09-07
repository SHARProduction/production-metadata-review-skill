export function validateManifest(value) {
  const stages = new Set(['preproduction', 'production', 'postproduction', 'delivery']);
  const releasableRights = new Set(['cleared', 'licensed', 'synthetic']);
  const errors = [];
  if (!value || typeof value !== 'object' || Array.isArray(value)) return { releasable: false, errors: ['manifest must be a JSON object'] };
  for (const key of ['title', 'project', 'stage', 'rights_status']) if (typeof value[key] !== 'string' || !value[key].trim()) errors.push(`${key} is required`);
  if (value.stage && !stages.has(value.stage)) errors.push(`stage must be one of: ${[...stages].join(', ')}`);
  if (value.rights_status === 'unknown') errors.push('rights_status=unknown is not releasable');
  if (value.rights_status && value.rights_status !== 'unknown' && !releasableRights.has(value.rights_status)) errors.push(`rights_status must be one of: ${[...releasableRights].join(', ')}, unknown`);
  return { releasable: errors.length === 0, errors };
}
export function runReview(text) { try { return validateManifest(JSON.parse(text)); } catch (e) { return { releasable:false, errors:[`Invalid JSON: ${e.message}`] }; } }
