/**
 * Seeds (or upserts) the full 506-problem index into MongoDB.
 *
 * Usage:
 *   MONGODB_URI="mongodb+srv://..." node scripts/seedProblems.js
 *
 * Safe to re-run: upserts by leetcodeNum, so running it again after
 * problems_index.json is updated (e.g. a batch of content added) will
 * update existing docs instead of duplicating them.
 */
require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Problem = require('../models/Problem');

const DATA_PATH = path.join(__dirname, 'problems_index.json');

async function seed() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('Missing MONGODB_URI env var. Set it in a .env file or export it.');
    process.exit(1);
  }

  await mongoose.connect(uri);
  console.log('Connected to MongoDB');

  const problems = JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'));
  console.log(`Loaded ${problems.length} problems from ${DATA_PATH}`);

  let upserted = 0;
  let modified = 0;

  for (const p of problems) {
    const result = await Problem.updateOne(
      { leetcodeNum: p.leetcodeNum },
      { $set: p },
      { upsert: true }
    );
    if (result.upsertedCount) upserted += 1;
    if (result.modifiedCount) modified += 1;
  }

  console.log(`Done. Upserted: ${upserted}, Modified: ${modified}`);
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
