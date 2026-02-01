import db from '../../../../lib/database';

export async function GET(request, { params }) {
  const { id } = await params;

  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM Category WHERE id = ?', [id], (err, row) => {
      if (err) {
        reject(new Response(JSON.stringify({ error: err.message }), { status: 500 }));
      } else if (!row) {
        reject(new Response(JSON.stringify({ error: 'Category not found' }), { status: 404 }));
      } else {
        resolve(new Response(JSON.stringify(row), { status: 200 }));
      }
    });
  });
}

export async function PUT(request, { params }) {
  const { id } = await params;
  const { name, description } = await request.json();

  return new Promise((resolve, reject) => {
    db.run('UPDATE Category SET name = ?, description = ? WHERE id = ?',
      [name, description, id], function(err) {
      if (err) {
        reject(new Response(JSON.stringify({ error: err.message }), { status: 500 }));
      } else if (this.changes === 0) {
        reject(new Response(JSON.stringify({ error: 'Category not found' }), { status: 404 }));
      } else {
        resolve(new Response(JSON.stringify({ message: 'Category updated' }), { status: 200 }));
      }
    });
  });
}

export async function DELETE(request, { params }) {
  const { id } = await params;

  return new Promise((resolve, reject) => {
    db.run('DELETE FROM Category WHERE id = ?', [id], function(err) {
      if (err) {
        reject(new Response(JSON.stringify({ error: err.message }), { status: 500 }));
      } else if (this.changes === 0) {
        reject(new Response(JSON.stringify({ error: 'Category not found' }), { status: 404 }));
      } else {
        resolve(new Response(JSON.stringify({ message: 'Category deleted' }), { status: 200 }));
      }
    });
  });
}