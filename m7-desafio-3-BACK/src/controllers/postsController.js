import {
  getPosts,
  createPost,
  editPost,
  deletePost,
} from "../models/postModel.js";

export const getAllPosts = async (req, res, next) => {
  try {
    const posts = await getPosts();
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

export const addPost = async (req, res, next) => {
  try {
    const { titulo, img, descripcion } = req.body;
    if (!titulo || !img || !descripcion) {
      console.log("Faltan datos por ingresar");
      res.status(400).json({
        error:
          "Se debe ingresar todos los campos, Verificar titulo url Descripcion",
      });
    }
    const newPost = await createPost(titulo, img, descripcion);
    res.status(201).json({ newPost });
  } catch (error) {
    next(error);
  }
};

export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { post } = req.body;

    const post_update = await editPost(
      post.titulo,
      post.img,
      post.descripcion,
      post.likes,
      id
    );

    res.status(200).json({ post: post_update });
  } catch (error) {
    res.status(500).json({
      error: `Actulizar el registro no es posible:  ${error.message} `,
    });
    console.log(error);
  }
};

export const deletePosts = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteResult = await deletePost(id);
    if (deleteResult === 0) {
      return res.status(404).json({ message: "No existe el registro" });
    }
    res.status(200).json({
      message: "Registro eliminado con exito",
    });
  } catch (error) {
    console.error("No se proceso la solicitud ", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const notFound = async (req, res) => {
  try {
    res.status(404).json({
      error: `This request is not possible Method: ${req.method}. Route:${req.url} `,
    });
  } catch (error) {
    console.log(error);
  }
};
