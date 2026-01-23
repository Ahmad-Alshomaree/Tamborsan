import db from '../../../../lib/database';
import { writeFile } from 'fs/promises';
import path from 'path';

export async function GET(request, { params }) {
  const { id } = params;

  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM Hizmetler WHERE id = ?', [id], (err, row) => {
      if (err) {
        reject(new Response(JSON.stringify({ error: err.message }), { status: 500 }));
      } else if (!row) {
        reject(new Response(JSON.stringify({ error: 'Service not found' }), { status: 404 }));
      } else {
        resolve(new Response(JSON.stringify(row), { status: 200 }));
      }
    });
  });
}

export async function PUT(request, { params }) {
  const { id } = params;

  try {
    const formData = await request.formData();

    const name = formData.get('name');
    const description = formData.get('description');
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
        const filepath = path.join(process.cwd(), 'public/services', filename);

        await writeFile(filepath, buffer);
        imagePaths.push(`/services/${filename}`);
      }
    }

    return new Promise((resolve, reject) => {
      db.run('UPDATE Hizmetler SET name = ?, description = ?, images = ? WHERE id = ?',
        [name, description, JSON.stringify(imagePaths), id], function(err) {
        if (err) {
          reject(new Response(JSON.stringify({ error: err.message }), { status: 500 }));
        } else if (this.changes === 0) {
          reject(new Response(JSON.stringify({ error: 'Service not found' }), { status: 404 }));
        } else {
          resolve(new Response(JSON.stringify({ message: 'Service updated' }), { status: 200 }));
        }
      });
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'File upload failed' }), { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const { id } = params;

  return new Promise((resolve, reject) => {
    db.run('DELETE FROM Hizmetler WHERE id = ?', [id], function(err) {
      if (err) {
        reject(new Response(JSON.stringify({ error: err.message }), { status: 500 }));
      } else if (this.changes === 0) {
        reject(new Response(JSON.stringify({ error: 'Service not found' }), { status: 404 }));
      } else {
        resolve(new Response(JSON.stringify({ message: 'Service deleted' }), { status: 200 }));
      }
    });
  });
}