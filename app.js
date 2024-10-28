const express = require("express");
const dotenv = require("dotenv");

dotenv.config()

const app = express();





const port = 5000;

app.listen(port, () => {
    console.log(`Server running in port ${port}`);
});