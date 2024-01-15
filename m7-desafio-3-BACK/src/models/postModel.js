import pool from "../../db/conectionDB.js";

export const getPosts = async () => {
  const SQLquery = { text: "SELECT * FROM posts ORDER BY id" };
  try {
    const response = await pool.query(SQLquery);
    return response.rows;
  } catch (error) {
    console.log(error);
  }
};

export const createPost = async (titulo, img, descripcion) => {
  const SQLquery = {
    text: "INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3, $4) RETURNING *",
    values: [titulo, img, descripcion, 0],
  };

  const response = await pool.query(SQLquery);
  return response.rows[0];
};

export const editPost = async (id) => {
  const SQLquery = {
    text: "UPDATE posts SET likes = likes+1  WHERE id = $1 RETURNING *",
    values: [id],
  };
  const response = await pool.query(SQLquery);
  return response.rows[0];
};

export const deletePost = async (id) => {
  const SQLquery = {
    text: "DELETE FROM posts WHERE id = $1",
    values: [id],
  };
  const response = await pool.query(SQLquery);
  return response.rowCount;
};
