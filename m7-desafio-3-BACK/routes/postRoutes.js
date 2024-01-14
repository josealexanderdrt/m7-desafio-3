import express from "express";
import {
  getAllPosts,
  addPost,
  notFound,
  updatePost,
  deletePosts,
} from "../src/controllers/postsController.js";
const router = express.Router();

router.get("/posts", getAllPosts);
router.post("/posts", addPost);
router.put("/posts/like/:id", updatePost);
router.delete("/posts/:id", deletePosts);
router.all("*", notFound);

export default router;
