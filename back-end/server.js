const express = require("express");
const bodyParser = require("body-parser");


const app = express();

const port = process.env.PORT || 5000;

// Init Middleware
app.use(express.json({ extended: false }));


// Routes
app.use("/api/auth", require("./routes/api/auth"));


app.listen(port, () => console.log(`Listening on port ${port}`));


