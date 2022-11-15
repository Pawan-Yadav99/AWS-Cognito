const express = require("express");
const authRoutes = require("./src/routes/authRoutes");
const dotenv = require("dotenv");
dotenv.config({
    path: './.env'
});
const port = process.env.PORT;

//declare app 
const app = express();

//parsing request body data
app.use(express.json({
    limit: '15kb'
}));

app.use(express.urlencoded({
    extended: true
}));

app.use("/api/v1/auth", authRoutes);

//

//start server on port
app.listen(port, () => {
    console.log(`Application is running on port ${port}`);
});
