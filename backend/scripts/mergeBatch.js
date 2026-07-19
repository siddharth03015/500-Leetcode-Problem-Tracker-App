/**
 * Merges a fully-authored content batch (description/examples/testCases/starterCode)
 * into problems_index.json, matched by leetcodeNum. Marks merged problems as 'draft'.
 *
 * Usage:
 *   node scripts/mergeBatch.js scripts/content_batches/batch_001.json
 */
const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, 'problems_index.json');
const batchPath = path.resolve(process.argv[2]);

if (!process.argv[2]) {
  console.error('Usage: node mergeBatch.js <path-to-batch.json>');
  process.exit(1);
}

const index = JSON.parse(fs.readFileSync(indexPath, 'utf-8'));
const batch = JSON.parse(fs.readFileSync(batchPath, 'utf-8'));

const byNum = new Map(index.map((p) => [p.leetcodeNum, p]));
let merged = 0;

for (const item of batch) {
  const target = byNum.get(item.leetcodeNum);
  if (!target) {
    console.warn(`No matching problem for leetcodeNum ${item.leetcodeNum}, skipping.`);
    continue;
  }
  Object.assign(target, item, { contentStatus: 'draft' });
  merged += 1;
}

fs.writeFileSync(indexPath, JSON.stringify(index, null, 2));
console.log(`Merged ${merged}/${batch.length} problems from ${path.basename(batchPath)}`);

const remaining = index.filter((p) => p.contentStatus === 'pending').length;
const done = index.length - remaining;
console.log(`Progress: ${done}/${index.length} problems have content, ${remaining} still pending.`);
