const express = require("express");
const authRoutes = require("./src/routes/authRoutes");
const dotenv = require("dotenv");
dotenv.config({
    path: './.env'
});
const port = process.env.PORT;

//declare app 
const app = express();
app.use("/api/v1/auth", authRoutes);

//start server on port
app.listen(port, () => {
    console.log(`Application is running on port ${port}`);
});
