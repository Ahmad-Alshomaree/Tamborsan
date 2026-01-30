const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(process.cwd(), 'Tambursan.db');
const db = new sqlite3.Database(dbPath);

// Initialize database tables
db.serialize(() => {
  // Kataloglar table
  db.run(`CREATE TABLE IF NOT EXISTS Kataloglar (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    file_path TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Belgeler table
  db.run(`CREATE TABLE IF NOT EXISTS Belgeler (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    file_path TEXT,
    type TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Category table
  db.run(`CREATE TABLE IF NOT EXISTS Category (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Ürünler table
  db.run(`CREATE TABLE IF NOT EXISTS Ürünler (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    images TEXT, -- JSON array of image paths
    category_id INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES Category(id)
  )`);

  // Hizmetler table
  db.run(`CREATE TABLE IF NOT EXISTS Hizmetler (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    images TEXT, -- JSON array of image paths
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // İletişim table
  db.run(`CREATE TABLE IF NOT EXISTS İletişim (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    phone_label TEXT DEFAULT 'Telefon:',
    phone_number TEXT,
    email_label TEXT DEFAULT 'E-posta:',
    email_address TEXT,
    location_label TEXT DEFAULT 'Adres:',
    location TEXT,
    facebook_account TEXT,
    instagram_account TEXT,
    x_account TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Galeri table
  db.run(`CREATE TABLE IF NOT EXISTS galeri (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    image_path TEXT,
    video_path TEXT,
    title TEXT,
    type TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Welcoming Page Images table
  db.run(`CREATE TABLE IF NOT EXISTS welcome_images (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    image_path TEXT NOT NULL,
    title TEXT,
  )`);
});

module.exports = db;
