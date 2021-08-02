const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const itemList = require("./itemListmock.json");

const admin = require("firebase-admin");
admin.initializeApp();

const app = express();
app.use(cors());

app.get("/", async (req, res) => {
  const snapshot = await admin.firestore().collection("itemList").get();

  let itemList = [];
  snapshot.forEach((doc) => {
    let id = doc.id;
    let data = doc.data();

    itemList.push({ id, ...data });
  });

  res.status(200).send(JSON.stringify(itemList));
});

exports.itemList = functions.https.onRequest(app);
