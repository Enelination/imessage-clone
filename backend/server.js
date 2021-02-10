import express from "express";
import mongoose from "mongoose";
import Pusher from "pusher";
import cors from "cors";

import mongoData from "./mongoData.js";

const app = express();
const port = process.env.PORT || 6000;

app.use(cors());
app.use(express.json());

//db
const mongoURI =
  "mongodb+srv://emmanuel:whiteeagle@cluster0.6x9ra.mongodb.net/iMessage-clone?retryWrites=true&w=majority";

mongoose.connect(mongoURI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once("open", () => {
  console.log("db connected");
});

app.get("/", (req, res) => res.status(200).send("yo"));

app.post("/new/conversation", (req, res) => {
  const dbData = req.body;

  mongoData.create(dbData, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(210).send(data);
    }
  });
});

app.post("/new/message", (req, res) => {
  mongoData.update(
    { _id: req.query.id },
    { $push: { conversation: req.body } },
    (err, data) => {
      if (err) {
        console.log("Error saving message...");
        console.log(err);

        res.status(500).send(err);
      } else {
        res.status(201).send(data);
      }
    }
  );
});

app.get("/get/conversationList", (req, res) => {
  mongoData.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      data.sort((b, a) => {
        return a.timestamp - b.timestamp;
      });

      let conversations = [];

      data.map((conversationData) => {
        const conversationInfo = {
          id: conversationData._id,
          name: conversationData.chatName,
          //   timestamp: conversationData.conversation[0].timestamp,
        };

        conversations.push(conversationInfo);
      });
      res.status(200).send(conversations);
    }
  });
});

app.listen(port, () => console.log(`listening on port:${port}`));
