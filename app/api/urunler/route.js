import db from '../../../lib/database';

export async function GET() {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM Ürünler', [], (err, rows) => {
      if (err) {
        reject(new Response(JSON.stringify({ error: err.message }), { status: 500 }));
      } else {
        resolve(new Response(JSON.stringify(rows), { status: 200 }));
      }
    });
  });
}

export async function POST(request) {
  const { name, slug, description, images, category_id } = await request.json();

  return new Promise((resolve, reject) => {
    db.run('INSERT INTO Ürünler (name, slug, description, images, category_id) VALUES (?, ?, ?, ?, ?)',
      [name, slug, description, JSON.stringify(images), category_id], function(err) {
      if (err) {
        reject(new Response(JSON.stringify({ error: err.message }), { status: 500 }));
      } else {
        resolve(new Response(JSON.stringify({ id: this.lastID }), { status: 201 }));
      }
    });
  });
}
