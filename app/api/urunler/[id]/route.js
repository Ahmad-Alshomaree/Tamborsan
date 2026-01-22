import db from '../../../../lib/database';

export async function GET(request, { params }) {
  const { slug } = params;

  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM Ürünler WHERE slug = ?', [slug], (err, row) => {
      if (err) {
        reject(new Response(JSON.stringify({ error: err.message }), { status: 500 }));
      } else if (!row) {
        reject(new Response(JSON.stringify({ error: 'Product not found' }), { status: 404 }));
      } else {
        resolve(new Response(JSON.stringify(row), { status: 200 }));
      }
    });
  });
}

export async function PUT(request, { params }) {
  const { slug } = params;
  const { name, newSlug, description, images, category_id } = await request.json();

  return new Promise((resolve, reject) => {
    db.run('UPDATE Ürünler SET name = ?, slug = ?, description = ?, images = ?, category_id = ? WHERE slug = ?',
      [name, newSlug, description, JSON.stringify(images), category_id, slug], function(err) {
      if (err) {
        reject(new Response(JSON.stringify({ error: err.message }), { status: 500 }));
      } else if (this.changes === 0) {
        reject(new Response(JSON.stringify({ error: 'Product not found' }), { status: 404 }));
      } else {
        resolve(new Response(JSON.stringify({ message: 'Product updated' }), { status: 200 }));
      }
    });
  });
}

export async function DELETE(request, { params }) {
  const { slug } = params;

  return new Promise((resolve, reject) => {
    db.run('DELETE FROM Ürünler WHERE slug = ?', [slug], function(err) {
      if (err) {
        reject(new Response(JSON.stringify({ error: err.message }), { status: 500 }));
      } else if (this.changes === 0) {
        reject(new Response(JSON.stringify({ error: 'Product not found' }), { status: 404 }));
      } else {
        resolve(new Response(JSON.stringify({ message: 'Product deleted' }), { status: 200 }));
      }
    });
  });
}
