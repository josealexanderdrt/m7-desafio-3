import express from "express";
import cors from "cors";
import { logger } from "logger-express";
import postsRouter from "./routes/postRoutes.js"
import { notFound } from "./src/controllers/postsController.js";



const app = express();
const PORT = process.env.PORT || 3000; 

app.use(express.json());
app.use(cors());
app.use(logger());
app.use( postsRouter);
app.use("*", notFound)

//Manejador de errores
app.use((err, req, res, next) =>{
    return res.status(500).json({
        status: "error",
        message: err.message
    })
})

app.listen(PORT,  console.log(`Server is runing: http://localhost:${PORT}`));
