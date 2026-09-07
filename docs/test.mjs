import {runReview} from './app.js';
import assert from 'node:assert/strict';
assert.deepEqual(runReview('{"title":"Synthetic film","project":"Demo","stage":"delivery","rights_status":"cleared"}'),{releasable:true,errors:[]});
assert.equal(runReview('{"title":"Synthetic film","project":"Demo","stage":"delivery","rights_status":"unknown"}').releasable,false);
assert.equal(runReview('{oops').releasable,false);
console.log('PASS: browser-local review scenarios');
