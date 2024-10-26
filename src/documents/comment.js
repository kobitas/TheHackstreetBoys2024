const mongoose = require('mongoose');
const { Schema, model } = mongoose;

// Schema für Kommentare
const commentSchema = new Schema({
  comment: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Referenz auf den User, der den Kommentar erstellt hat
  createdAt: { type: Date, default: Date.now },
});

module.exports = model('commentSchema', commentSchema);