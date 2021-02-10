import express from "express";
import mongoose from "mongoose";
import Pusher from "pusher";
import cors from "cors";

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.status(200).send("yo"));

app.listen(port, () => console.log(`listening on port:${port}`));
