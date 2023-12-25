import pool from "../../db/conectionDB.js";

export const getPosts = async () => {
  const SQLquery = { text: "SELECT * FROM posts" };
  try {
    const response = await pool.query(SQLquery);
    return response.rows;
  } catch (error) {
    console.log(error);
  }
};

export const createPost = async ( titulo, img, descripcion ) => {
  const SQLquery = {
    text: "INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3, $4) RETURNING *",
    values: [titulo, img, descripcion, 0],
  };

  try {
    const response = await pool.query(SQLquery);
    return response.rows[0];
  } catch (error) {
    console.log(error);
  }
};
