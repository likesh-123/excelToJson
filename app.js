const express = require('express');
const mongoose = require('mongoose')
const userRouter = require("./Router/userRoute")
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });


const app = express();

app.use(express.json());

mongoose
    .connect(process.env.DATABASE, {
        dbName: process.env.DATABASE_NAME,
        user: process.env.DATABASE_USER,
        pass: process.env.DATABASE_PASSWORD
    })
    .then(() => console.log("Database Connected successfully!"))
    .catch(err => console.log(err.message))

const PORT = process.env.PORT || 3000;

app.use('/upload', userRouter)

app.listen(PORT, () => {
    console.log(`Listening on PORT: ${PORT}`);
})