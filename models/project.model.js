const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    projectName: {
      type: String,
      required: true,
      trim: true,
    },

    projectDesc: {
      type: String,
      default: 'No Description provided',
    },

    // 🔥 Add slug field
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// 🔥 Pre-save hook to auto-generate slug from projectName
projectSchema.pre('save', function (next) {
  if (this.isModified('projectName')) {
    this.slug = this.projectName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-') // replace spaces & special chars with -
      .replace(/^-+|-+$/g, '');   // trim starting/ending dashes
  }
  next();
});

// ✅ Update virtual URL to use slug instead of _id
projectSchema.virtual('url').get(function () {
  return `projects/${this.slug}`;
});

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;
