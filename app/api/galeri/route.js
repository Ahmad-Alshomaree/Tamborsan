import db from '../../../lib/database';
import { writeFile } from 'fs/promises';
import path from 'path';

export async function GET() {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM galeri ORDER BY id DESC', [], (err, rows) => {
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

    const title = formData.get('title');
    const type = formData.get('type');
    const video_path = formData.get('video_path') || null;

    let imagePath = null;

    // Handle image upload if type is image
    if (type === 'image') {
      const imageFile = formData.get('image');
      if (imageFile && imageFile.size > 0) {
        const bytes = await imageFile.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Generate unique filename
        const timestamp = Date.now();
        const extension = path.extname(imageFile.name) || '.jpg';
        const filename = `${timestamp}_gallery${extension}`;
        const filepath = path.join(process.cwd(), 'public/Galary/image', filename);

        await writeFile(filepath, buffer);
        imagePath = `/Galary/image/${filename}`;
      }
    }

    return new Promise((resolve, reject) => {
      db.run('INSERT INTO galeri (image_path, video_path, title, type) VALUES (?, ?, ?, ?)',
        [imagePath, video_path, title, type], function(err) {
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

export async function PUT(request) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');

    if (!id) {
      return new Response(JSON.stringify({ error: 'ID is required' }), { status: 400 });
    }

    const formData = await request.formData();

    const title = formData.get('title');
    const type = formData.get('type');
    const video_path = formData.get('video_path') || null;

    let imagePath = null;

    // Handle image upload if type is image
    if (type === 'image') {
      const imageFile = formData.get('image');
      if (imageFile && imageFile.size > 0) {
        const bytes = await imageFile.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Generate unique filename
        const timestamp = Date.now();
        const extension = path.extname(imageFile.name) || '.jpg';
        const filename = `${timestamp}_gallery${extension}`;
        const filepath = path.join(process.cwd(), 'public/Galary/image', filename);

        await writeFile(filepath, buffer);
        imagePath = `/Galary/image/${filename}`;
      }
    }

    return new Promise((resolve, reject) => {
      let query, params;

      if (imagePath) {
        // Update with new image
        query = 'UPDATE galeri SET image_path = ?, video_path = ?, title = ?, type = ? WHERE id = ?';
        params = [imagePath, video_path, title, type, id];
      } else {
        // Update without changing image
        query = 'UPDATE galeri SET video_path = ?, title = ?, type = ? WHERE id = ?';
        params = [video_path, title, type, id];
      }

      db.run(query, params, function(err) {
        if (err) {
          reject(new Response(JSON.stringify({ error: err.message }), { status: 500 }));
        } else if (this.changes === 0) {
          reject(new Response(JSON.stringify({ error: 'Item not found' }), { status: 404 }));
        } else {
          resolve(new Response(JSON.stringify({ message: 'Updated successfully' }), { status: 200 }));
        }
      });
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Update failed' }), { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');

    if (!id) {
      return new Response(JSON.stringify({ error: 'ID is required' }), { status: 400 });
    }

    return new Promise((resolve, reject) => {
      db.run('DELETE FROM galeri WHERE id = ?', [id], function(err) {
        if (err) {
          reject(new Response(JSON.stringify({ error: err.message }), { status: 500 }));
        } else if (this.changes === 0) {
          reject(new Response(JSON.stringify({ error: 'Item not found' }), { status: 404 }));
        } else {
          resolve(new Response(JSON.stringify({ message: 'Deleted successfully' }), { status: 200 }));
        }
      });
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Delete failed' }), { status: 500 });
  }
}
