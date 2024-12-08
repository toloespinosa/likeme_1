import express from 'express';
import cors from 'cors';
import pkg from 'pg';

  
const { Pool } = pkg;

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Configuración de la base de datos PostgreSQL
const pool = new Pool({
  user: 'tolo',
  host: 'localhost',
  database: 'likeme',
  password: 'u.catolica11',
  port: 5432,
});

// Ruta GET: Devuelve todos los posts
app.get('/posts', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM posts');
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los posts.' });
  }
});

// Ruta POST: Inserta un nuevo post
app.post('/posts', async (req, res) => {
  const { titulo, img, descripcion } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3, $4) RETURNING *',
      [titulo, img, descripcion, 0]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar el post.' });
  }
});

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
