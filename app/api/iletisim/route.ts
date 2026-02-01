import db from '../../../lib/database';

export async function GET() {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM İletişim', [], (err, rows) => {
      if (err) {
        reject(new Response(JSON.stringify({ error: err.message }), { status: 500 }));
      } else {
        resolve(new Response(JSON.stringify(rows), { status: 200 }));
      }
    });
  });
}

export async function POST(request) {
  const { phone_label, phone_number, email_label, email_address, location_label, location, facebook_account, instagram_account, x_account } = await request.json();

  return new Promise((resolve, reject) => {
    db.run('INSERT OR REPLACE INTO İletişim (id, phone_label, phone_number, email_label, email_address, location_label, location, facebook_account, instagram_account, x_account) VALUES (1, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [phone_label, phone_number, email_label, email_address, location_label, location, facebook_account, instagram_account, x_account], function(err) {
      if (err) {
        reject(new Response(JSON.stringify({ error: err.message }), { status: 500 }));
      } else {
        resolve(new Response(JSON.stringify({ id: 1 }), { status: 201 }));
      }
    });
  });
}
