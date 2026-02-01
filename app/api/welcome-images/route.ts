import db from '../../../lib/database';

export async function GET() {
  return new Promise((resolve) => {
    db.all(
      'SELECT * FROM welcome_images WHERE is_active = 1 ORDER BY display_order ASC',
      (err, rows) => {
        if (err) {
          resolve(Response.json({ error: err.message }, { status: 500 }));
        } else {
          resolve(Response.json(rows));
        }
      }
    );
  });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { image_path, title, description, alt_text, display_order } = body;

    return new Promise((resolve) => {
      db.run(
        `INSERT INTO welcome_images (image_path, title, description, alt_text, display_order) 
         VALUES (?, ?, ?, ?, ?)`,
        [image_path, title, description, alt_text, display_order || 0],
        function (err) {
          if (err) {
            resolve(Response.json({ error: err.message }, { status: 500 }));
          } else {
            resolve(Response.json({ id: this.lastID, message: 'Image added successfully' }, { status: 201 }));
          }
        }
      );
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }
}
