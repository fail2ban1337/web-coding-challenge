const express = require("express");

const app = express();

const port = process.env.PORT || 5000;

// Init Middleware
app.use(
  express.json({
    extended: false
  })
);

// Routes
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/users", require("./routes/api/users"));
app.use("/api/shops", require("./routes/api/shops"));

app.listen(port, () => console.log(`Listening on port ${port}`));
