const express = require("express");
const dotenv = require("dotenv");

dotenv.config()

const app = express();

app.use(express.json());




const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server running in port: ${port}`);
});