const express = require("express");
const dotenv = require("dotenv");
const router = require("./routes/routes.js");

dotenv.config()

const app = express();

app.use(express.json());

app.use('/api', router);

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server running in port: ${port}`);
});