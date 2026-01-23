import db from '../../../lib/database';
import { writeFile } from 'fs/promises';
import path from 'path';

export async function GET() {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM Ürünler', [], (err, rows) => {
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
    const formData = await request.formData();

    const name = formData.get('name');
    const slug = formData.get('slug');
    const description = formData.get('description');
    const category_id = formData.get('category_id');

    // Handle uploaded files
    const imagePaths = [];
    const fileEntries = Array.from(formData.entries()).filter(([key]) => key.startsWith('image_'));

    for (const [key, file] of fileEntries) {
      if (file && file.size > 0) {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Generate unique filename
        const timestamp = Date.now();
        const extension = path.extname(file.name) || '.jpg';
        const filename = `${timestamp}_${key}${extension}`;
        const filepath = path.join(process.cwd(), 'public/products', filename);

        await writeFile(filepath, buffer);
        imagePaths.push(`/products/${filename}`);
      }
    }

    return new Promise((resolve, reject) => {
      db.run('INSERT INTO Ürünler (name, slug, description, images, category_id) VALUES (?, ?, ?, ?, ?)',
        [name, slug, description, JSON.stringify(imagePaths), category_id], function(err) {
        if (err) {
          reject(new Response(JSON.stringify({ error: err.message }), { status: 500 }));
        } else {
          resolve(new Response(JSON.stringify({ id: this.lastID }), { status: 201 }));
        }
      });
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'File upload failed' }), { status: 500 });
  }
}
