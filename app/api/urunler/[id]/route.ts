import db from '../../../../lib/database';
import { writeFile } from 'fs/promises';
import path from 'path';

export async function GET(request, { params }) {
  const { id } = await params;

  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM Ürünler WHERE slug = ?', [id], (err, row) => {
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
  const { id } = await params;

  try {
    const formData = await request.formData();

    const name = formData.get('name');
    const slug = formData.get('slug');
    const description = formData.get('description');
    const category_id = formData.get('category_id');
    const existingImages = formData.get('existingImages');

    // Start with existing images if provided
    let imagePaths = existingImages ? JSON.parse(existingImages) : [];

    // Handle new uploaded files
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
      db.run('UPDATE Ürünler SET name = ?, slug = ?, description = ?, images = ?, category_id = ? WHERE id = ?',
        [name, slug, description, JSON.stringify(imagePaths), category_id, id], function(err) {
        if (err) {
          reject(new Response(JSON.stringify({ error: err.message }), { status: 500 }));
        } else if (this.changes === 0) {
          reject(new Response(JSON.stringify({ error: 'Product not found' }), { status: 404 }));
        } else {
          resolve(new Response(JSON.stringify({ message: 'Product updated' }), { status: 200 }));
        }
      });
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'File upload failed' }), { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const { id } = await params;

  return new Promise((resolve, reject) => {
    db.run('DELETE FROM Ürünler WHERE id = ?', [id], function(err) {
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
