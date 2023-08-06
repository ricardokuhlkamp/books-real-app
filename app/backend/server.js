const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const routes = require("./src/routes/index");

const cors = require("cors");

const app = express();
const PORT = process.env.PORT | 5000;

app.use(express.json());

// Defina a origem permitida no corsOptions
// const corsOptions = {
//   origin: ["https://books-realm-app.vercel.app"],
//   methods: ["POST", "GET", "DELETE", "PUT"],
//   credentials: true
// };

// app.use(cors(corsOptions));
app.use(cors());

app.get("/", (req, res) => {
  res.send("ok...");
});
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

app.use("/api", routes);

app.listen(+PORT, '0.0.0.0', () => console.log(`Listening at ${PORT}`));
