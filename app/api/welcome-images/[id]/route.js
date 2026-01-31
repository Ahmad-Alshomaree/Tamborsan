import db from '../../../../lib/database';

export async function GET(request, { params }) {
  const { id } = await params;

  return new Promise((resolve) => {
    db.get(
      'SELECT * FROM welcome_images WHERE id = ?',
      [id],
      (err, row) => {
        if (err) {
          resolve(Response.json({ error: err.message }, { status: 500 }));
        } else if (!row) {
          resolve(Response.json({ error: 'Image not found' }, { status: 404 }));
        } else {
          resolve(Response.json(row));
        }
      }
    );
  });
}

export async function PUT(request, { params }) {
  const { id } = await params;
  try {
    const body = await request.json();
    const { image_path, title, description, alt_text, display_order, is_active } = body;

    return new Promise((resolve) => {
      db.run(
        `UPDATE welcome_images 
         SET image_path = ?, title = ?, description = ?, alt_text = ?, display_order = ?, is_active = ?, updated_at = CURRENT_TIMESTAMP 
         WHERE id = ?`,
        [image_path, title, description, alt_text, display_order, is_active, id],
        function (err) {
          if (err) {
            resolve(Response.json({ error: err.message }, { status: 500 }));
          } else {
            resolve(Response.json({ message: 'Image updated successfully' }));
          }
        }
      );
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(request, { params }) {
  const { id } = await params;

  return new Promise((resolve) => {
    db.run(
      'DELETE FROM welcome_images WHERE id = ?',
      [id],
      function (err) {
        if (err) {
          resolve(Response.json({ error: err.message }, { status: 500 }));
        } else {
          resolve(Response.json({ message: 'Image deleted successfully' }));
        }
      }
    );
  });
}
