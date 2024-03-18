const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser"); 
const authRoutes = require("./routes");
const app = express();
const PORT = process.env.PORT || 5000;
require('dotenv').config();
app.use(bodyParser.json());

const cors = require('cors');
const corsOptions = {
  origin: '*', 
  optionsSuccessStatus: 200 
  };
  
  app.use(cors(corsOptions));

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

app.use("/api", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
