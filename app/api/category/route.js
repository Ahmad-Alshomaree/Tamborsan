import db from '../../../lib/database';

export async function GET() {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM Category', [], (err, rows) => {
      if (err) {
        reject(new Response(JSON.stringify({ error: err.message }), { status: 500 }));
      } else {
        resolve(new Response(JSON.stringify(rows), { status: 200 }));
      }
    });
  });
}

export async function POST(request) {
  const { name, description } = await request.json();

  return new Promise((resolve, reject) => {
    db.run('INSERT INTO Category (name, description) VALUES (?, ?)',
      [name, description], function(err) {
      if (err) {
        reject(new Response(JSON.stringify({ error: err.message }), { status: 500 }));
      } else {
        resolve(new Response(JSON.stringify({ id: this.lastID }), { status: 201 }));
      }
    });
  });
}
