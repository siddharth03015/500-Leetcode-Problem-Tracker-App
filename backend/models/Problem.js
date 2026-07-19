const mongoose = require('mongoose');

const TestCaseSchema = new mongoose.Schema({
  input: { type: String, required: true },
  expectedOutput: { type: String, required: true },
  isSample: { type: Boolean, default: false }, // sample cases shown to user; others hidden for judging
}, { _id: false });

const ExampleSchema = new mongoose.Schema({
  input: String,
  output: String,
  explanation: String,
}, { _id: false });

const StarterCodeSchema = new mongoose.Schema({
  cpp: String,
  python: String,
  java: String,
}, { _id: false });

const ProblemSchema = new mongoose.Schema({
  srNo: { type: Number, required: true },
  leetcodeNum: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true, index: true },
  acceptanceRate: Number,
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], required: true },
  tags: [String],

  description: { type: String, default: null },      // original wording, not copied from source
  examples: [ExampleSchema],
  constraints: [String],

  testCases: [TestCaseSchema],
  starterCode: StarterCodeSchema,

  timeLimitMs: { type: Number, default: 2000 },
  memoryLimitKb: { type: Number, default: 262144 }, // 256 MB

  contentStatus: {
    type: String,
    enum: ['pending', 'draft', 'reviewed'],
    default: 'pending',
  },
}, { timestamps: true });

module.exports = mongoose.model('Problem', ProblemSchema);
