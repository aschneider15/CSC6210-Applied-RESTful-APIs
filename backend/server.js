const express = require("express");
const mongoose = require("mongoose");

// developer-defined dependencies
const mercenaryRoutes = require("./routes/mercenaries");

const app = express();
const port = 3000;

mongoose
  .connect("mongodb://localhost:27017/TF2")
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log("Example app listening on port" + port);
    });
  })
  .catch((err) => console.error("Failed to connect", err));

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/mercenaries", mercenaryRoutes);

