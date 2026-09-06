# Manifest contract

The skill accepts a JSON object with the following fields:

| Field | Type | Rule |
| --- | --- | --- |
| `title` | string | Non-empty deliverable title. |
| `project` | string | Non-empty production or project identifier. |
| `stage` | string | `preproduction`, `production`, `postproduction`, or `delivery`. |
| `rights_status` | string | `cleared`, `licensed`, or `synthetic` is releasable; `unknown` blocks the recommendation. |

The validator evaluates declared metadata only. It cannot verify licenses,
copyright ownership, performer releases, or rights in the underlying media.
