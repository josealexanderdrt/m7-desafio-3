import {
  getPosts,
  createPost,
  editPost,
  deletePost,
} from "../models/postModel.js";

import { findError } from "../utilis/utilis.js";

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
    /*   if (!titulo || !img || !descripcion) {
      console.log("Faltan datos por ingresar");
      res.status(400).json({
        error:
          "Se debe ingresar todos los campos, Verificar titulo url Descripcion",
      });
    } */
    const newPost = await createPost(titulo, img, descripcion);
    res.status(201).json({ newPost });
  } catch (error) {
    const errorFound = findError(error.code);
    if (errorFound.length > 0) {
      console.log("error");
      return res
        .status(errorFound[0].status)
        .json({ error: errorFound[0].message });
    }
    console.log("SIGUE");
    return res.status(500).json({ message: error });
  }
};

export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;

    /*
    const { post } = req.body;
    if (Object.keys(post).length === undefined || Object.keys(post).length < 1) {
      throw new Error("No puedes actulizar un registro vacio");
    }
    const okProperties = ["titulo", "img", "descripcion", "likes"];
    const notOkProperties = Object.keys(post).filter(
      (property) => !okProperties.includes(property)
    );

    if (notOkProperties.length > 0) {
      console.log(notOkProperties);
      throw new Error(
        `La propiedad ${notOkProperties.join(" , ")} no esta permitida`
      );
    } else if (!post.titulo && !post.img && !post.descripcion && !post.likes) {
      res.status(500).json({
        error: `Actulizar el registro no es posible debes actuliazar al menos 1 propiedad :  ${okProperties.join(
          " , "
        )} `,
      });
    }*/
    const post_update = await editPost(
      id
    );
    console.log("actulizado: ",post_update);
    res.status(200).json({ post: post_update });
  } catch (error) {
    const errorFound = findError(error.code);
    if (errorFound.length > 0) {
      console.log("error");
      return res
        .status(errorFound[0].status)
        .json({ error: errorFound[0].message });
    } 
console.log(error); 
    res.status(500).json({
      error: `Actulizar el registro no es posible:  ${error.message} `,
    });
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
    const errorFound = findError(error.code);
    if (errorFound.length > 0) {
      console.log("error");
      return res
        .status(errorFound[0].status)
        .json({ error: errorFound[0].message });
    }

    console.log(error);
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
