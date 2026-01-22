const db = require('../lib/database');

db.serialize(() => {
  // Add category_id column to Ürünler table if it doesn't exist
  db.run('ALTER TABLE Ürünler ADD COLUMN category_id INTEGER REFERENCES Category(id)', (err) => {
    if (err && !err.message.includes('duplicate column name')) {
      console.error('Error adding category_id column:', err.message);
    } else {
      console.log('Category column added or already exists');
    }
  });

  db.close();
});
