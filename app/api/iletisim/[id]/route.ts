import db from '../../../../lib/database';

export async function GET(request, { params }) {
  const { id } = await params;

  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM İletişim WHERE id = ?', [id], (err, row) => {
      if (err) {
        reject(new Response(JSON.stringify({ error: err.message }), { status: 500 }));
      } else if (!row) {
        reject(new Response(JSON.stringify({ error: 'Contact not found' }), { status: 404 }));
      } else {
        resolve(new Response(JSON.stringify(row), { status: 200 }));
      }
    });
  });
}

export async function PUT(request, { params }) {
  const { id } = await params;
  const { phone_label, phone_number, email_label, email_address, location_label, location, facebook_account, instagram_account, x_account } = await request.json();

  return new Promise((resolve, reject) => {
    db.run('UPDATE İletişim SET phone_label = ?, phone_number = ?, email_label = ?, email_address = ?, location_label = ?, location = ?, facebook_account = ?, instagram_account = ?, x_account = ? WHERE id = ?',
      [phone_label, phone_number, email_label, email_address, location_label, location, facebook_account, instagram_account, x_account, id], function(err) {
      if (err) {
        reject(new Response(JSON.stringify({ error: err.message }), { status: 500 }));
      } else if (this.changes === 0) {
        reject(new Response(JSON.stringify({ error: 'Contact not found' }), { status: 404 }));
      } else {
        resolve(new Response(JSON.stringify({ message: 'Contact updated' }), { status: 200 }));
      }
    });
  });
}

export async function DELETE(request, { params }) {
  const { id } = await params;

  return new Promise((resolve, reject) => {
    db.run('DELETE FROM İletişim WHERE id = ?', [id], function(err) {
      if (err) {
        reject(new Response(JSON.stringify({ error: err.message }), { status: 500 }));
      } else if (this.changes === 0) {
        reject(new Response(JSON.stringify({ error: 'Contact not found' }), { status: 404 }));
      } else {
        resolve(new Response(JSON.stringify({ message: 'Contact deleted' }), { status: 200 }));
      }
    });
  });
}