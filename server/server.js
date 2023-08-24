require("dotenv").config();

const express = require("express");
const app = express();

app.use(express.json());

const itemsRouter = require("./routes/items");
app.use("/items", itemsRouter);

//build setup
const path = require("path");

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => res.send("Please set to production"));
}

app.listen(process.env.PORT || 5000, () => console.log("Server Started"));
