import { getPosts, createPost } from "../models/postModel.js";

export const getAllPosts = async (req, res, next) => {
  try {
    const posts = await getPosts();
    res.status(200).json(posts);
  } catch (error) {
    next(error)
  }
};

export const addPost = async (req, res,next) => {
  try {
    const { titulo, url, descripcion } = req.body;
    if (!titulo || !url || !descripcion ){
      console.log("Faltan datos por ingresar");
      res.status(400).json({error: "Se debe ingresar todos los campos, Verificar titulo url Descripcion"})
    }
    const newPost = await createPost(titulo, url, descripcion);
    res.status(201).json({newPost});
  } catch (error) {
    next(error)
  }
};


export const notFound = async (req, res) => {

  try {
    res.status(404).json({ error: `This request is not possible Method: ${req.method}. Route:${req.url} ` })
  } catch (error) {
    console.log(error)
  }
/*     res.status(404).json({ error: "This request is not possible" });
    console.log("This request is not possible", error);
     */

}