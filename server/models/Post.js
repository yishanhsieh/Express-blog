const mongoose = require("mongoose");
const { marked } = require("marked");
const slugify = require("slugify");
const createDomPurify = require("dompurify");
const { JSDOM } = require("jsdom");
const dompurify = createDomPurify(new JSDOM().window);

const Schema = mongoose.Schema;
const PostSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  sanitizedHtml: {
    type: String,
    required: true,
  },
});

PostSchema.pre("validate", function (next) {
  if (this.body) {
    this.sanitizedHtml = dompurify.sanitize(marked(this.body));
  }
  next();
});

module.exports = mongoose.model("Post", PostSchema);
