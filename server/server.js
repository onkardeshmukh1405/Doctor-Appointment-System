const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config();
require("./config/dbConfig");
app.use(express.json());

const userRoute = require("./routes/userRoute");
const adminRoute = require("./routes/adminRoute");
const doctorsRoute = require("./routes/doctorsRoute");

app.use("/api/user", userRoute);
app.use("/api/admin", adminRoute);
app.use("/api/doctor", doctorsRoute);

// -----------------Deployment--------------

const _dirname1 = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(_dirname1, "/client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(_dirname1, "client", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is running Successfully");
  });
}

// -----------------Deployment--------------
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
