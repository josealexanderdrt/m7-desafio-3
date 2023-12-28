import express from "express";
import {getAllPosts, addPost, notFound} from "../src/controllers/postsController.js";
const  router = express.Router();

router.get('/posts',getAllPosts)
router.post('/posts', addPost)
router.all("*", notFound)

export default router;