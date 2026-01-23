import db from '../../../lib/database';

export async function GET() {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM galeri ORDER BY id DESC', [], (err, rows) => {
      if (err) {
        reject(new Response(JSON.stringify({ error: err.message }), { status: 500 }));
      } else {
        resolve(new Response(JSON.stringify(rows), { status: 200 }));
      }
    });
  });
}

export async function POST(request) {
  try {
    const { image_path, video_path, title, type } = await request.json();

    return new Promise((resolve, reject) => {
      db.run('INSERT INTO galeri (image_path, video_path, title, type) VALUES (?, ?, ?, ?)',
        [image_path, video_path, title, type], function(err) {
        if (err) {
          reject(new Response(JSON.stringify({ error: err.message }), { status: 500 }));
        } else {
          resolve(new Response(JSON.stringify({ id: this.lastID }), { status: 201 }));
        }
      });
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Invalid request' }), { status: 400 });
  }
}
