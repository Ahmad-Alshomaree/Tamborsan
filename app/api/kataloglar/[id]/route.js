import db from '../../../../lib/database';

export async function GET(request, { params }) {
  const { id } = params;

  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM Kataloglar WHERE id = ?', [id], (err, row) => {
      if (err) {
        reject(new Response(JSON.stringify({ error: err.message }), { status: 500 }));
      } else if (!row) {
        reject(new Response(JSON.stringify({ error: 'Catalog not found' }), { status: 404 }));
      } else {
        resolve(new Response(JSON.stringify(row), { status: 200 }));
      }
    });
  });
}

export async function PUT(request, { params }) {
  const { id } = params;
  const { name, description, file_path } = await request.json();

  return new Promise((resolve, reject) => {
    db.run('UPDATE Kataloglar SET name = ?, description = ?, file_path = ? WHERE id = ?',
      [name, description, file_path, id], function(err) {
      if (err) {
        reject(new Response(JSON.stringify({ error: err.message }), { status: 500 }));
      } else if (this.changes === 0) {
        reject(new Response(JSON.stringify({ error: 'Catalog not found' }), { status: 404 }));
      } else {
        resolve(new Response(JSON.stringify({ message: 'Catalog updated' }), { status: 200 }));
      }
    });
  });
}

export async function DELETE(request, { params }) {
  const { id } = params;

  return new Promise((resolve, reject) => {
    db.run('DELETE FROM Kataloglar WHERE id = ?', [id], function(err) {
      if (err) {
        reject(new Response(JSON.stringify({ error: err.message }), { status: 500 }));
      } else if (this.changes === 0) {
        reject(new Response(JSON.stringify({ error: 'Catalog not found' }), { status: 404 }));
      } else {
        resolve(new Response(JSON.stringify({ message: 'Catalog deleted' }), { status: 200 }));
      }
    });
  });
}