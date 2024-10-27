import mongoose from 'index.js';
const { Schema, model } = mongoose;
const commentSchema = require('./comment');


// Schema für das Informationsobjekt
const infoObjectSchema = new Schema({
  name: { type: String, required: true }, // Name des Informationsobjekts
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Referenz auf den Autor
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Besitzer des Objekts
  contributors: [{ type: Schema.Types.ObjectId, ref: 'User' }], // Array von Mitwirkenden
  tags: [{ type: String }], // Array von Tags für die Kategorisierung
  createdAt: { type: Date, default: Date.now }, // Erstellungsdatum
  updatedAt: { type: Date, default: Date.now }, // Letztes Aktualisierungsdatum
  comments: [commentSchema], // Array von Kommentaren als Unterdokumente
  type: { type: String, required: true }, // Typ des Informationsobjekts
  content: { type: String }, // Inhalt des Informationsobjekts (z.B. Text)
  linkToFile: { type: String }, // URL zu einer verknüpften Datei
  jsonObject: { type: Schema.Types.Mixed }, // JSON-Objekt für beliebige strukturierte Daten
  metaData: { type: Map, of: String }, // Map für Meta-Daten mit beliebigen Key-Value-Paaren
  views: { type: Number, default: 0 }, // Anzahl der Aufrufe
  permissionLevel: { type: String, enum: ['public', 'private', 'restricted'], default: 'private' }, // Berechtigungslevel für den Zugriff
  fileEncoding: {type: String }
});

// Vor dem Speichern das Aktualisierungsdatum aktualisieren
infoObjectSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = model('InfoObject', infoObjectSchema);
