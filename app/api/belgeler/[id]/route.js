import db from '../../../../lib/database';

export async function GET(request, { params }) {
  const { id } = await params;

  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM Belgeler WHERE id = ?', [id], (err, row) => {
      if (err) {
        reject(new Response(JSON.stringify({ error: err.message }), { status: 500 }));
      } else if (!row) {
        reject(new Response(JSON.stringify({ error: 'Document not found' }), { status: 404 }));
      } else {
        resolve(new Response(JSON.stringify(row), { status: 200 }));
      }
    });
  });
}

export async function PUT(request, { params }) {
  const { id } = await params;
  const { name, description, file_path, type } = await request.json();

  return new Promise((resolve, reject) => {
    db.run('UPDATE Belgeler SET name = ?, description = ?, file_path = ?, type = ? WHERE id = ?',
      [name, description, file_path, type, id], function(err) {
      if (err) {
        reject(new Response(JSON.stringify({ error: err.message }), { status: 500 }));
      } else if (this.changes === 0) {
        reject(new Response(JSON.stringify({ error: 'Document not found' }), { status: 404 }));
      } else {
        resolve(new Response(JSON.stringify({ message: 'Document updated' }), { status: 200 }));
      }
    });
  });
}

export async function DELETE(request, { params }) {
  const { id } = await params;

  return new Promise((resolve, reject) => {
    db.run('DELETE FROM Belgeler WHERE id = ?', [id], function(err) {
      if (err) {
        reject(new Response(JSON.stringify({ error: err.message }), { status: 500 }));
      } else if (this.changes === 0) {
        reject(new Response(JSON.stringify({ error: 'Document not found' }), { status: 404 }));
      } else {
        resolve(new Response(JSON.stringify({ message: 'Document deleted' }), { status: 200 }));
      }
    });
  });
}